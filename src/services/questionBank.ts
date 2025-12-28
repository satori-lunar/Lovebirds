import { DailyQuestion, QuestionCategory, QuestionDepth } from '../types';

/**
 * Daily Question Bank
 *
 * Questions progress from light to deeper over time.
 * Categories help ensure variety in topics.
 */

export const dailyQuestions: DailyQuestion[] = [
  // === LIGHT QUESTIONS (Early Relationship / Warm-up) ===

  // Favorites Category
  {
    id: 'q001',
    text: 'What is your favorite movie?',
    category: 'favorites',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q002',
    text: 'What is your favorite comfort food?',
    category: 'favorites',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q003',
    text: 'What is your favorite season of the year?',
    category: 'favorites',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q004',
    text: 'What is your favorite way to spend a Sunday morning?',
    category: 'favorites',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q005',
    text: 'What is your favorite song to sing along to?',
    category: 'favorites',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q006',
    text: 'What is your favorite childhood cartoon?',
    category: 'favorites',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q007',
    text: 'What is your favorite ice cream flavor?',
    category: 'favorites',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q008',
    text: 'What is your favorite holiday?',
    category: 'favorites',
    depth: 'light',
    createdAt: new Date(),
  },

  // Fun Category
  {
    id: 'q009',
    text: 'If you could have any superpower, what would it be?',
    category: 'fun',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q010',
    text: 'What would you do if you won the lottery?',
    category: 'fun',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q011',
    text: 'What is the most embarrassing song on your playlist?',
    category: 'fun',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q012',
    text: 'If you could eat only one cuisine for the rest of your life, what would it be?',
    category: 'fun',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q013',
    text: 'What is your go-to karaoke song?',
    category: 'fun',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q014',
    text: 'What fictional world would you want to live in?',
    category: 'fun',
    depth: 'light',
    createdAt: new Date(),
  },

  // Preferences Category
  {
    id: 'q015',
    text: 'Are you a morning person or a night owl?',
    category: 'preferences',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q016',
    text: 'Do you prefer sweet or savory snacks?',
    category: 'preferences',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q017',
    text: 'Beach vacation or mountain getaway?',
    category: 'preferences',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q018',
    text: 'Would you rather cook at home or go out to eat?',
    category: 'preferences',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q019',
    text: 'Do you prefer big parties or small gatherings?',
    category: 'preferences',
    depth: 'light',
    createdAt: new Date(),
  },
  {
    id: 'q020',
    text: 'Coffee or tea?',
    category: 'preferences',
    depth: 'light',
    createdAt: new Date(),
  },

  // === MEDIUM DEPTH QUESTIONS ===

  // Memories Category
  {
    id: 'q021',
    text: 'What is your happiest childhood memory?',
    category: 'memories',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q022',
    text: 'What is the best trip you have ever taken?',
    category: 'memories',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q023',
    text: 'What is your favorite memory of us together?',
    category: 'memories',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q024',
    text: 'What was the best gift you ever received?',
    category: 'memories',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q025',
    text: 'What moment in your life are you most proud of?',
    category: 'memories',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q026',
    text: 'What was the first concert you ever attended?',
    category: 'memories',
    depth: 'medium',
    createdAt: new Date(),
  },

  // Dreams Category
  {
    id: 'q027',
    text: 'Where is one place you have always wanted to visit?',
    category: 'dreams',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q028',
    text: 'What is something you have always wanted to learn?',
    category: 'dreams',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q029',
    text: 'If you could have any job for a day, what would it be?',
    category: 'dreams',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q030',
    text: 'What would your ideal date night look like?',
    category: 'dreams',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q031',
    text: 'What is on your bucket list?',
    category: 'dreams',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q032',
    text: 'Where do you see yourself in 5 years?',
    category: 'dreams',
    depth: 'medium',
    createdAt: new Date(),
  },

  // Preferences (deeper)
  {
    id: 'q033',
    text: 'What is your love language?',
    category: 'preferences',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q034',
    text: 'How do you prefer to be comforted when you are sad?',
    category: 'preferences',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q035',
    text: 'What helps you relax after a stressful day?',
    category: 'preferences',
    depth: 'medium',
    createdAt: new Date(),
  },
  {
    id: 'q036',
    text: 'How do you like to celebrate achievements?',
    category: 'preferences',
    depth: 'medium',
    createdAt: new Date(),
  },

  // === DEEP QUESTIONS ===

  // Values Category
  {
    id: 'q037',
    text: 'What is the most important quality in a relationship?',
    category: 'values',
    depth: 'deep',
    createdAt: new Date(),
  },
  {
    id: 'q038',
    text: 'What does trust mean to you?',
    category: 'values',
    depth: 'deep',
    createdAt: new Date(),
  },
  {
    id: 'q039',
    text: 'What are you most grateful for in life?',
    category: 'values',
    depth: 'deep',
    createdAt: new Date(),
  },
  {
    id: 'q040',
    text: 'What life lesson took you the longest to learn?',
    category: 'values',
    depth: 'deep',
    createdAt: new Date(),
  },
  {
    id: 'q041',
    text: 'What does home mean to you?',
    category: 'values',
    depth: 'deep',
    createdAt: new Date(),
  },
  {
    id: 'q042',
    text: 'What makes you feel loved?',
    category: 'values',
    depth: 'deep',
    createdAt: new Date(),
  },

  // Deep Category
  {
    id: 'q043',
    text: 'What is your biggest fear in our relationship?',
    category: 'deep',
    depth: 'deep',
    createdAt: new Date(),
  },
  {
    id: 'q044',
    text: 'What do you wish I understood better about you?',
    category: 'deep',
    depth: 'deep',
    createdAt: new Date(),
  },
  {
    id: 'q045',
    text: 'What is one thing you would change about how we communicate?',
    category: 'deep',
    depth: 'deep',
    createdAt: new Date(),
  },
  {
    id: 'q046',
    text: 'What makes you feel most connected to me?',
    category: 'deep',
    depth: 'deep',
    createdAt: new Date(),
  },
  {
    id: 'q047',
    text: 'What is something you have never told anyone?',
    category: 'deep',
    depth: 'deep',
    createdAt: new Date(),
  },
  {
    id: 'q048',
    text: 'What do you need more of from our relationship?',
    category: 'deep',
    depth: 'deep',
    createdAt: new Date(),
  },
  {
    id: 'q049',
    text: 'What is your vision for our future together?',
    category: 'deep',
    depth: 'deep',
    createdAt: new Date(),
  },
  {
    id: 'q050',
    text: 'When do you feel most vulnerable with me?',
    category: 'deep',
    depth: 'deep',
    createdAt: new Date(),
  },
];

// Get questions by depth
export const getQuestionsByDepth = (depth: QuestionDepth): DailyQuestion[] => {
  return dailyQuestions.filter((q) => q.depth === depth);
};

// Get questions by category
export const getQuestionsByCategory = (category: QuestionCategory): DailyQuestion[] => {
  return dailyQuestions.filter((q) => q.category === category);
};

// Get a random question
export const getRandomQuestion = (excludeIds: string[] = []): DailyQuestion => {
  const available = dailyQuestions.filter((q) => !excludeIds.includes(q.id));
  if (available.length === 0) {
    return dailyQuestions[Math.floor(Math.random() * dailyQuestions.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
};

export default dailyQuestions;
