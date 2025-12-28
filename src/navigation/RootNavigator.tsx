import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../stores';
import { RootStackParamList } from '../types';
import { colors, typography } from '../constants/theme';

// Auth Screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import PartnerInviteScreen from '../screens/auth/PartnerInviteScreen';

// Onboarding Screens
import OnboardingLoveLanguageScreen from '../screens/onboarding/OnboardingLoveLanguageScreen';
import OnboardingLikesScreen from '../screens/onboarding/OnboardingLikesScreen';
import OnboardingDislikesScreen from '../screens/onboarding/OnboardingDislikesScreen';
import OnboardingBudgetScreen from '../screens/onboarding/OnboardingBudgetScreen';
import OnboardingEnergyScreen from '../screens/onboarding/OnboardingEnergyScreen';
import OnboardingGoalsScreen from '../screens/onboarding/OnboardingGoalsScreen';
import OnboardingCompleteScreen from '../screens/onboarding/OnboardingCompleteScreen';

// Main App
import MainTabNavigator from './MainTabNavigator';

// Daily Question Screens
import DailyQuestionScreen from '../screens/daily-question/DailyQuestionScreen';
import DailyQuestionAnswerScreen from '../screens/daily-question/DailyQuestionAnswerScreen';
import DailyQuestionWaitingScreen from '../screens/daily-question/DailyQuestionWaitingScreen';
import DailyQuestionGuessScreen from '../screens/daily-question/DailyQuestionGuessScreen';
import DailyQuestionResultScreen from '../screens/daily-question/DailyQuestionResultScreen';
import DailyQuestionCompleteScreen from '../screens/daily-question/DailyQuestionCompleteScreen';

// Date Screens
import PlanDateScreen from '../screens/dates/PlanDateScreen';
import DateSwipeScreen from '../screens/dates/DateSwipeScreen';
import DateSwipeResultScreen from '../screens/dates/DateSwipeResultScreen';

// Memory Screens
import CreateMemoryScreen from '../screens/memories/CreateMemoryScreen';
import MemoryDetailScreen from '../screens/memories/MemoryDetailScreen';

// Settings
import SettingsScreen from '../screens/settings/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { isAuthenticated, isOnboardingComplete } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="PartnerInvite" component={PartnerInviteScreen} />
          </>
        ) : !isOnboardingComplete ? (
          // Onboarding Stack
          <>
            <Stack.Screen
              name="OnboardingLoveLanguage"
              component={OnboardingLoveLanguageScreen}
            />
            <Stack.Screen
              name="OnboardingLikes"
              component={OnboardingLikesScreen}
            />
            <Stack.Screen
              name="OnboardingDislikes"
              component={OnboardingDislikesScreen}
            />
            <Stack.Screen
              name="OnboardingBudget"
              component={OnboardingBudgetScreen}
            />
            <Stack.Screen
              name="OnboardingEnergy"
              component={OnboardingEnergyScreen}
            />
            <Stack.Screen
              name="OnboardingGoals"
              component={OnboardingGoalsScreen}
            />
            <Stack.Screen
              name="OnboardingComplete"
              component={OnboardingCompleteScreen}
            />
          </>
        ) : (
          // Main App Stack
          <>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />

            {/* Daily Question Flow */}
            <Stack.Screen
              name="DailyQuestion"
              component={DailyQuestionScreen}
            />
            <Stack.Screen
              name="DailyQuestionAnswer"
              component={DailyQuestionAnswerScreen}
            />
            <Stack.Screen
              name="DailyQuestionWaiting"
              component={DailyQuestionWaitingScreen}
            />
            <Stack.Screen
              name="DailyQuestionGuess"
              component={DailyQuestionGuessScreen}
            />
            <Stack.Screen
              name="DailyQuestionResult"
              component={DailyQuestionResultScreen}
            />
            <Stack.Screen
              name="DailyQuestionComplete"
              component={DailyQuestionCompleteScreen}
            />

            {/* Dates Flow */}
            <Stack.Screen name="PlanDate" component={PlanDateScreen} />
            <Stack.Screen name="DateSwipe" component={DateSwipeScreen} />
            <Stack.Screen
              name="DateSwipeResult"
              component={DateSwipeResultScreen}
            />

            {/* Memories */}
            <Stack.Screen name="CreateMemory" component={CreateMemoryScreen} />
            <Stack.Screen name="MemoryDetail" component={MemoryDetailScreen} />

            {/* Settings */}
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
