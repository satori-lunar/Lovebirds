import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserOnboarding } from '../types';

interface AuthState {
  user: User | null;
  onboarding: UserOnboarding | null;
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setOnboarding: (onboarding: UserOnboarding | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateOnboarding: (data: Partial<UserOnboarding>) => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      onboarding: null,
      isAuthenticated: false,
      isOnboardingComplete: false,
      isLoading: false,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      setOnboarding: (onboarding) => {
        set({
          onboarding,
          isOnboardingComplete: !!onboarding?.completedAt,
        });
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // TODO: Replace with actual API call
          // Simulated login
          const mockUser: User = {
            id: 'user-1',
            email,
            name: email.split('@')[0],
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signUp: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        try {
          // TODO: Replace with actual API call
          const mockUser: User = {
            id: `user-${Date.now()}`,
            email,
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          onboarding: null,
          isAuthenticated: false,
          isOnboardingComplete: false,
        });
      },

      updateOnboarding: (data) => {
        const { onboarding, user } = get();
        if (!user) return;

        const updated: UserOnboarding = {
          userId: user.id,
          loveLanguages: onboarding?.loveLanguages || [],
          likes: onboarding?.likes || [],
          dislikes: onboarding?.dislikes || [],
          budgetComfort: onboarding?.budgetComfort || 'moderate',
          energyLevel: onboarding?.energyLevel || 'medium',
          relationshipGoals: onboarding?.relationshipGoals || [],
          updatedAt: new Date(),
          ...onboarding,
          ...data,
        };

        set({ onboarding: updated });
      },

      completeOnboarding: () => {
        const { onboarding } = get();
        if (onboarding) {
          set({
            onboarding: { ...onboarding, completedAt: new Date() },
            isOnboardingComplete: true,
          });
        }
      },
    }),
    {
      name: 'lovebirds-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        onboarding: state.onboarding,
        isAuthenticated: state.isAuthenticated,
        isOnboardingComplete: state.isOnboardingComplete,
      }),
    }
  )
);

export default useAuthStore;
