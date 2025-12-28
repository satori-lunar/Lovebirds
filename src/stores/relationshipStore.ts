import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { crossPlatformStorage } from '../utils/storage';
import { User, Relationship, ImportantDate, RelationshipStatus } from '../types';

interface RelationshipState {
  relationship: Relationship | null;
  partner: User | null;
  importantDates: ImportantDate[];
  inviteCode: string | null;
  isLoading: boolean;

  // Actions
  setRelationship: (relationship: Relationship | null) => void;
  setPartner: (partner: User | null) => void;
  generateInviteCode: () => string;
  joinWithCode: (code: string) => Promise<void>;
  addImportantDate: (date: Omit<ImportantDate, 'id'>) => void;
  updateImportantDate: (id: string, data: Partial<ImportantDate>) => void;
  removeImportantDate: (id: string) => void;
  updateRelationshipStatus: (status: RelationshipStatus) => void;
}

// Generate a random 6-character invite code
const generateCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const useRelationshipStore = create<RelationshipState>()(
  persist(
    (set, get) => ({
      relationship: null,
      partner: null,
      importantDates: [],
      inviteCode: null,
      isLoading: false,

      setRelationship: (relationship) => {
        set({ relationship });
      },

      setPartner: (partner) => {
        set({ partner });
      },

      generateInviteCode: () => {
        const code = generateCode();
        set({ inviteCode: code });
        return code;
      },

      joinWithCode: async (code: string) => {
        set({ isLoading: true });
        try {
          // TODO: Replace with actual API call to validate code and link partners
          // For now, simulate successful pairing
          const mockRelationship: Relationship = {
            id: `rel-${Date.now()}`,
            partnerAId: 'current-user-id',
            partnerBId: 'partner-user-id',
            startDate: new Date(),
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          const mockPartner: User = {
            id: 'partner-user-id',
            email: 'partner@example.com',
            name: 'My Partner',
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          set({
            relationship: mockRelationship,
            partner: mockPartner,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      addImportantDate: (dateData) => {
        const newDate: ImportantDate = {
          ...dateData,
          id: `date-${Date.now()}`,
        };
        set((state) => ({
          importantDates: [...state.importantDates, newDate],
        }));
      },

      updateImportantDate: (id, data) => {
        set((state) => ({
          importantDates: state.importantDates.map((date) =>
            date.id === id ? { ...date, ...data } : date
          ),
        }));
      },

      removeImportantDate: (id) => {
        set((state) => ({
          importantDates: state.importantDates.filter((date) => date.id !== id),
        }));
      },

      updateRelationshipStatus: (status) => {
        const { relationship } = get();
        if (relationship) {
          set({
            relationship: {
              ...relationship,
              status,
              updatedAt: new Date(),
            },
          });
        }
      },
    }),
    {
      name: 'lovebirds-relationship',
      storage: createJSONStorage(() => crossPlatformStorage),
      partialize: (state) => ({
        relationship: state.relationship,
        partner: state.partner,
        importantDates: state.importantDates,
        inviteCode: state.inviteCode,
      }),
    }
  )
);

export default useRelationshipStore;
