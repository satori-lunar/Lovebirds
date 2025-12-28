import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { crossPlatformStorage } from '../utils/storage';
import {
  DateIdea,
  PlannedDate,
  DateSwipeSession,
  DateSwipe,
  PlannedDateStatus,
} from '../types';
import { dateIdeas } from '../services/dateIdeasBank';

interface DatesStoreState {
  plannedDates: PlannedDate[];
  currentSwipeSession: DateSwipeSession | null;
  isLoading: boolean;

  // Actions
  generateDateIdeas: (
    count: number,
    filters?: {
      budget?: string;
      energy?: string;
      location?: string;
    }
  ) => DateIdea[];
  planDate: (
    dateIdea: DateIdea,
    plannedFor: Date,
    userId: string,
    relationshipId: string,
    notes?: string
  ) => void;
  updatePlannedDateStatus: (dateId: string, status: PlannedDateStatus) => void;
  setReminder: (dateId: string, reminderDate: Date) => void;

  // Swipe Mode
  startSwipeSession: (relationshipId: string) => void;
  submitSwipe: (userId: string, dateIdeaId: string, liked: boolean) => void;
  getMatches: () => DateIdea[];
  selectFinalDate: (dateIdeaId: string) => void;
  endSwipeSession: () => void;
}

// Fisher-Yates shuffle
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useDatesStore = create<DatesStoreState>()(
  persist(
    (set, get) => ({
      plannedDates: [],
      currentSwipeSession: null,
      isLoading: false,

      generateDateIdeas: (count, filters) => {
        let filtered = [...dateIdeas];

        if (filters?.budget) {
          filtered = filtered.filter((d) => d.budgetLevel === filters.budget);
        }
        if (filters?.energy) {
          filtered = filtered.filter((d) => d.energyLevel === filters.energy);
        }
        if (filters?.location) {
          filtered = filtered.filter((d) => d.location === filters.location);
        }

        // Shuffle and take requested count
        const shuffled = shuffleArray(filtered);
        return shuffled.slice(0, count);
      },

      planDate: (dateIdea, plannedFor, userId, relationshipId, notes) => {
        const newPlannedDate: PlannedDate = {
          id: `planned-${Date.now()}`,
          relationshipId,
          dateIdeaId: dateIdea.id,
          dateIdea,
          plannedFor,
          plannedBy: userId,
          status: 'planned',
          notes,
          createdAt: new Date(),
        };

        set((state) => ({
          plannedDates: [...state.plannedDates, newPlannedDate],
        }));
      },

      updatePlannedDateStatus: (dateId, status) => {
        set((state) => ({
          plannedDates: state.plannedDates.map((d) =>
            d.id === dateId ? { ...d, status } : d
          ),
        }));
      },

      setReminder: (dateId, reminderDate) => {
        set((state) => ({
          plannedDates: state.plannedDates.map((d) =>
            d.id === dateId ? { ...d, reminder: reminderDate } : d
          ),
        }));
      },

      // Swipe Mode - Generate 30 ideas for 2-minute session
      startSwipeSession: (relationshipId) => {
        const ideas = shuffleArray(dateIdeas).slice(0, 30);
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

        const session: DateSwipeSession = {
          id: `swipe-${Date.now()}`,
          relationshipId,
          dateIdeas: ideas,
          partnerASwipes: [],
          partnerBSwipes: [],
          matches: [],
          expiresAt,
          createdAt: new Date(),
        };

        set({ currentSwipeSession: session });
      },

      submitSwipe: (userId, dateIdeaId, liked) => {
        const { currentSwipeSession } = get();
        if (!currentSwipeSession) return;

        const swipe: DateSwipe = {
          dateIdeaId,
          liked,
          swipedAt: new Date(),
        };

        // Determine if this is partner A or B
        const isPartnerA = currentSwipeSession.partnerASwipes.length === 0 ||
          currentSwipeSession.partnerASwipes.some(
            (s) => s.dateIdeaId === dateIdeaId
          ) === false;

        let updatedSession: DateSwipeSession;

        if (isPartnerA) {
          updatedSession = {
            ...currentSwipeSession,
            partnerASwipes: [...currentSwipeSession.partnerASwipes, swipe],
          };
        } else {
          updatedSession = {
            ...currentSwipeSession,
            partnerBSwipes: [...currentSwipeSession.partnerBSwipes, swipe],
          };
        }

        // Check for matches after both partners have swiped
        const partnerALiked = updatedSession.partnerASwipes
          .filter((s) => s.liked)
          .map((s) => s.dateIdeaId);
        const partnerBLiked = updatedSession.partnerBSwipes
          .filter((s) => s.liked)
          .map((s) => s.dateIdeaId);

        const matches = partnerALiked.filter((id) => partnerBLiked.includes(id));
        updatedSession.matches = matches;

        set({ currentSwipeSession: updatedSession });
      },

      getMatches: () => {
        const { currentSwipeSession } = get();
        if (!currentSwipeSession) return [];

        return currentSwipeSession.dateIdeas.filter((idea) =>
          currentSwipeSession.matches.includes(idea.id)
        );
      },

      selectFinalDate: (dateIdeaId) => {
        const { currentSwipeSession } = get();
        if (!currentSwipeSession) return;

        set({
          currentSwipeSession: {
            ...currentSwipeSession,
            selectedDateId: dateIdeaId,
          },
        });
      },

      endSwipeSession: () => {
        set({ currentSwipeSession: null });
      },
    }),
    {
      name: 'lovebirds-dates',
      storage: createJSONStorage(() => crossPlatformStorage),
      partialize: (state) => ({
        plannedDates: state.plannedDates,
      }),
    }
  )
);

export default useDatesStore;
