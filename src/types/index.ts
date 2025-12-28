/**
 * Lovebirds Type Definitions
 */

// User & Authentication
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  partnerId?: string;
  relationshipId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Relationship {
  id: string;
  partnerAId: string;
  partnerBId: string;
  startDate: Date;
  status: RelationshipStatus;
  inviteCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RelationshipStatus = 'pending' | 'active' | 'paused';

// Onboarding - Per User, Private
export interface UserOnboarding {
  userId: string;

  // Required fields
  loveLanguages: LoveLanguage[];
  likes: string[];
  dislikes: string[];
  budgetComfort: BudgetLevel;
  energyLevel: EnergyLevel;
  relationshipGoals: string[];

  // Optional / Sensitive (Private by default)
  wantsAndNeeds?: string[];
  fearsAndTriggers?: string[];
  healthConsiderations?: string[];
  livingSituation?: LivingSituation;

  // Meta
  completedAt?: Date;
  updatedAt: Date;
}

export type LoveLanguage =
  | 'words_of_affirmation'
  | 'acts_of_service'
  | 'receiving_gifts'
  | 'quality_time'
  | 'physical_touch';

export type BudgetLevel = 'free' | 'budget' | 'moderate' | 'generous' | 'splurge';

export type EnergyLevel = 'low' | 'medium_low' | 'medium' | 'medium_high' | 'high';

export type LivingSituation = 'together' | 'same_city' | 'long_distance';

// Daily Question System (CORE FEATURE)
export interface DailyQuestion {
  id: string;
  text: string;
  category: QuestionCategory;
  depth: QuestionDepth;
  createdAt: Date;
}

export type QuestionCategory =
  | 'favorites'
  | 'memories'
  | 'dreams'
  | 'preferences'
  | 'values'
  | 'fun'
  | 'deep';

export type QuestionDepth = 'light' | 'medium' | 'deep';

export interface DailyQuestionSession {
  id: string;
  relationshipId: string;
  questionId: string;
  date: Date;
  partnerAAnswer?: QuestionAnswer;
  partnerBAnswer?: QuestionAnswer;
  partnerAGuess?: QuestionGuess;
  partnerBGuess?: QuestionGuess;
}

export interface QuestionAnswer {
  partnerId: string;
  answer: string;
  answeredAt: Date;
}

export interface QuestionGuess {
  partnerId: string;
  guess: string;
  isCorrect: boolean;
  guessedAt: Date;
}

export type DailyQuestionState =
  | 'not_started'
  | 'answering'
  | 'waiting_for_partner'
  | 'guessing'
  | 'completed';

// Weekly Love Language Suggestions
export interface WeeklyLoveSuggestion {
  id: string;
  userId: string;
  targetPartnerId: string;
  week: Date;
  suggestions: LoveSuggestion[];
  createdAt: Date;
}

export interface LoveSuggestion {
  id: string;
  title: string;
  description: string;
  loveLanguage: LoveLanguage;
  status: SuggestionStatus;
  completedAt?: Date;
}

export type SuggestionStatus = 'new' | 'saved' | 'dismissed' | 'completed';

// Dates System
export interface DateIdea {
  id: string;
  title: string;
  description: string;
  category: DateCategory;
  budgetLevel: BudgetLevel;
  energyLevel: EnergyLevel;
  duration: DateDuration;
  location: DateLocation;
  imageUrl?: string;
  tags: string[];
}

export type DateCategory =
  | 'adventure'
  | 'relaxation'
  | 'food'
  | 'culture'
  | 'outdoors'
  | 'at_home'
  | 'surprise'
  | 'romantic';

export type DateDuration = 'quick' | 'half_day' | 'full_day' | 'overnight';

export type DateLocation = 'at_home' | 'local' | 'travel';

export interface PlannedDate {
  id: string;
  relationshipId: string;
  dateIdeaId: string;
  dateIdea: DateIdea;
  plannedFor: Date;
  plannedBy: string;
  reminder?: Date;
  status: PlannedDateStatus;
  notes?: string;
  createdAt: Date;
}

export type PlannedDateStatus = 'planned' | 'completed' | 'cancelled';

// Swipe Date Matching
export interface DateSwipeSession {
  id: string;
  relationshipId: string;
  dateIdeas: DateIdea[];
  partnerASwipes: DateSwipe[];
  partnerBSwipes: DateSwipe[];
  matches: string[]; // DateIdea IDs
  selectedDateId?: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface DateSwipe {
  dateIdeaId: string;
  liked: boolean;
  swipedAt: Date;
}

// Gift Guidance
export interface GiftSuggestion {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  budgetTier: BudgetLevel;
  occasion: GiftOccasion;
  link?: string;
  imageUrl?: string;
}

export type GiftOccasion =
  | 'birthday'
  | 'anniversary'
  | 'valentines'
  | 'christmas'
  | 'just_because';

// Relationship Tracker
export interface ImportantDate {
  id: string;
  relationshipId: string;
  title: string;
  date: Date;
  type: ImportantDateType;
  recurring: boolean;
  reminderDays: number[]; // Days before to remind
  notes?: string;
}

export type ImportantDateType =
  | 'anniversary'
  | 'birthday_a'
  | 'birthday_b'
  | 'first_date'
  | 'first_kiss'
  | 'custom';

// Memories (Paid Feature)
export interface Memory {
  id: string;
  relationshipId: string;
  createdBy: string;
  type: MemoryType;
  title?: string;
  content?: string;
  imageUrls: string[];
  tags: string[];
  isShared: boolean; // Private vs shared toggle
  dateOfMemory: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type MemoryType = 'photo' | 'journal' | 'milestone';

// App State
export interface AppState {
  user: User | null;
  partner: User | null;
  relationship: Relationship | null;
  onboarding: UserOnboarding | null;
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
}

// Navigation Types
export type RootStackParamList = {
  // Auth
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  PartnerInvite: undefined;

  // Onboarding
  OnboardingLoveLanguage: undefined;
  OnboardingLikes: undefined;
  OnboardingDislikes: undefined;
  OnboardingBudget: undefined;
  OnboardingEnergy: undefined;
  OnboardingGoals: undefined;
  OnboardingSensitive: undefined;
  OnboardingComplete: undefined;

  // Main App
  MainTabs: undefined;
  DailyQuestion: undefined;
  DailyQuestionAnswer: undefined;
  DailyQuestionWaiting: undefined;
  DailyQuestionGuess: undefined;
  DailyQuestionResult: { isCorrect: boolean; correctAnswer: string };
  DailyQuestionComplete: undefined;

  // Dates
  PlanDate: undefined;
  DateSwipe: undefined;
  DateSwipeResult: undefined;

  // Memories
  CreateMemory: undefined;
  MemoryDetail: { memoryId: string };

  // Settings
  Settings: undefined;
  EditProfile: undefined;
  EditOnboarding: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Dates: undefined;
  Memories: undefined;
  Profile: undefined;
};
