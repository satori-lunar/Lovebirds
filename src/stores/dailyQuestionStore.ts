import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DailyQuestion,
  DailyQuestionSession,
  QuestionAnswer,
  QuestionGuess,
  DailyQuestionState,
} from '../types';
import { dailyQuestions } from '../services/questionBank';

interface DailyQuestionStoreState {
  currentQuestion: DailyQuestion | null;
  currentSession: DailyQuestionSession | null;
  questionHistory: string[]; // Question IDs that have been asked
  userState: DailyQuestionState;
  isLoading: boolean;

  // Actions
  initializeDailyQuestion: (relationshipId: string, userId: string) => void;
  submitAnswer: (userId: string, answer: string) => void;
  submitGuess: (userId: string, guess: string, partnerAnswer: string) => boolean;
  getUserState: (userId: string) => DailyQuestionState;
  getPartnerAnswer: (userId: string) => string | null;
  hasPartnerAnswered: (userId: string) => boolean;
  resetDaily: () => void;
}

// Check if it's the same day
const isSameDay = (date1: Date, date2: Date): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// Get a question that hasn't been asked recently
const getNewQuestion = (history: string[]): DailyQuestion => {
  const recentHistory = history.slice(-30); // Avoid repeating last 30 questions
  const availableQuestions = dailyQuestions.filter(
    (q) => !recentHistory.includes(q.id)
  );

  if (availableQuestions.length === 0) {
    // If all questions have been asked, start over
    return dailyQuestions[Math.floor(Math.random() * dailyQuestions.length)];
  }

  return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
};

export const useDailyQuestionStore = create<DailyQuestionStoreState>()(
  persist(
    (set, get) => ({
      currentQuestion: null,
      currentSession: null,
      questionHistory: [],
      userState: 'not_started',
      isLoading: false,

      initializeDailyQuestion: (relationshipId: string, userId: string) => {
        const { currentSession, questionHistory } = get();
        const today = new Date();

        // Check if there's already a session for today
        if (currentSession && isSameDay(new Date(currentSession.date), today)) {
          // Session exists, determine user state
          const state = get().getUserState(userId);
          set({ userState: state });
          return;
        }

        // Create new daily question session
        const question = getNewQuestion(questionHistory);
        const newSession: DailyQuestionSession = {
          id: `session-${Date.now()}`,
          relationshipId,
          questionId: question.id,
          date: today,
        };

        set({
          currentQuestion: question,
          currentSession: newSession,
          questionHistory: [...questionHistory, question.id],
          userState: 'not_started',
        });
      },

      submitAnswer: (userId: string, answer: string) => {
        const { currentSession } = get();
        if (!currentSession) return;

        const questionAnswer: QuestionAnswer = {
          partnerId: userId,
          answer,
          answeredAt: new Date(),
        };

        // Determine if this is partner A or B based on existing answers
        const isPartnerA = !currentSession.partnerAAnswer;

        const updatedSession = {
          ...currentSession,
          ...(isPartnerA
            ? { partnerAAnswer: questionAnswer }
            : { partnerBAnswer: questionAnswer }),
        };

        // Determine new state
        const hasPartnerAnswered =
          (isPartnerA && currentSession.partnerBAnswer) ||
          (!isPartnerA && currentSession.partnerAAnswer);

        set({
          currentSession: updatedSession,
          userState: hasPartnerAnswered ? 'guessing' : 'waiting_for_partner',
        });
      },

      submitGuess: (userId: string, guess: string, partnerAnswer: string): boolean => {
        const { currentSession } = get();
        if (!currentSession) return false;

        // Simple comparison (case-insensitive, trimmed)
        const normalizedGuess = guess.toLowerCase().trim();
        const normalizedAnswer = partnerAnswer.toLowerCase().trim();
        const isCorrect =
          normalizedGuess === normalizedAnswer ||
          normalizedAnswer.includes(normalizedGuess) ||
          normalizedGuess.includes(normalizedAnswer);

        const questionGuess: QuestionGuess = {
          partnerId: userId,
          guess,
          isCorrect,
          guessedAt: new Date(),
        };

        // Determine if this is partner A or B
        const isPartnerA = !currentSession.partnerAGuess;

        const updatedSession = {
          ...currentSession,
          ...(isPartnerA
            ? { partnerAGuess: questionGuess }
            : { partnerBGuess: questionGuess }),
        };

        set({
          currentSession: updatedSession,
          userState: 'completed',
        });

        return isCorrect;
      },

      getUserState: (userId: string): DailyQuestionState => {
        const { currentSession } = get();
        if (!currentSession) return 'not_started';

        // Check if user has answered
        const userAnswer =
          currentSession.partnerAAnswer?.partnerId === userId
            ? currentSession.partnerAAnswer
            : currentSession.partnerBAnswer?.partnerId === userId
            ? currentSession.partnerBAnswer
            : null;

        // Check if user has guessed
        const userGuess =
          currentSession.partnerAGuess?.partnerId === userId
            ? currentSession.partnerAGuess
            : currentSession.partnerBGuess?.partnerId === userId
            ? currentSession.partnerBGuess
            : null;

        if (userGuess) return 'completed';
        if (!userAnswer) return 'answering';

        // User has answered, check if partner has answered
        const partnerAnswer =
          currentSession.partnerAAnswer?.partnerId !== userId
            ? currentSession.partnerAAnswer
            : currentSession.partnerBAnswer;

        if (!partnerAnswer) return 'waiting_for_partner';
        return 'guessing';
      },

      getPartnerAnswer: (userId: string): string | null => {
        const { currentSession } = get();
        if (!currentSession) return null;

        // Get the partner's answer (not the user's)
        if (currentSession.partnerAAnswer?.partnerId !== userId) {
          return currentSession.partnerAAnswer?.answer || null;
        }
        if (currentSession.partnerBAnswer?.partnerId !== userId) {
          return currentSession.partnerBAnswer?.answer || null;
        }
        return null;
      },

      hasPartnerAnswered: (userId: string): boolean => {
        const { currentSession } = get();
        if (!currentSession) return false;

        if (currentSession.partnerAAnswer?.partnerId !== userId) {
          return !!currentSession.partnerAAnswer;
        }
        if (currentSession.partnerBAnswer?.partnerId !== userId) {
          return !!currentSession.partnerBAnswer;
        }
        return false;
      },

      resetDaily: () => {
        set({
          currentQuestion: null,
          currentSession: null,
          userState: 'not_started',
        });
      },
    }),
    {
      name: 'lovebirds-daily-question',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentQuestion: state.currentQuestion,
        currentSession: state.currentSession,
        questionHistory: state.questionHistory,
        userState: state.userState,
      }),
    }
  )
);

export default useDailyQuestionStore;
