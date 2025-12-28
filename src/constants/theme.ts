/**
 * Lovebirds Design Tokens
 *
 * Pink-to-purple gradient theme inspired by Figma design.
 * Romantic, warm, and modern aesthetic.
 */

export const colors = {
  // Gradient colors (pink to purple)
  gradient: {
    start: '#EC4899', // pink-500
    middle: '#A855F7', // purple-500
    end: '#8B5CF6', // violet-500
  },

  // Pink palette
  pink: {
    50: '#FDF2F8',
    100: '#FCE7F3',
    200: '#FBCFE8',
    300: '#F9A8D4',
    400: '#F472B6',
    500: '#EC4899',
    600: '#DB2777',
    700: '#BE185D',
  },

  // Purple palette
  purple: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#9333EA',
    700: '#7C3AED',
  },

  // Background
  background: '#FFFFFF',
  backgroundGradient: ['#FDF2F8', '#FAF5FF'], // Light pink to light purple

  // Primary - Pink (main actions)
  primary: '#EC4899',
  primaryLight: '#F472B6',
  primaryDark: '#DB2777',

  // Accent - Purple (highlights)
  accent: '#A855F7',
  accentLight: '#C084FC',
  accentDark: '#9333EA',

  // Secondary - Light pink
  secondary: '#FCE7F3',
  secondaryDark: '#FBCFE8',

  // Card background
  card: '#FFFFFF',
  cardShadow: 'rgba(236, 72, 153, 0.1)',

  // Text
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  // Status colors
  success: '#10B981',
  successLight: '#D1FAE5',
  successBg: '#ECFDF5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',

  // Borders
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderPink: '#FBCFE8',

  // Special
  overlay: 'rgba(0, 0, 0, 0.5)',
  glass: 'rgba(255, 255, 255, 0.8)',
};

export const gradients = {
  // Main gradient (pink to purple)
  primary: ['#EC4899', '#A855F7'],
  primaryReverse: ['#A855F7', '#EC4899'],

  // Lighter gradients for backgrounds
  background: ['#FDF2F8', '#FAF5FF'],
  backgroundDark: ['#FCE7F3', '#F3E8FF'],

  // Button gradients
  button: ['#EC4899', '#A855F7'],
  buttonHover: ['#DB2777', '#9333EA'],

  // Card accent gradients
  pinkAccent: ['#FDF2F8', '#FCE7F3'],
  purpleAccent: ['#FAF5FF', '#F3E8FF'],
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  screenPadding: 20,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

export const shadows = {
  card: {
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },

  cardLight: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  button: {
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  glow: {
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 5,
  },
};

export const touchTargets = {
  minimum: 44,
  comfortable: 48,
  large: 56,
};

export const animations = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

export const theme = {
  colors,
  gradients,
  typography,
  spacing,
  borderRadius,
  shadows,
  touchTargets,
  animations,
};

export type Theme = typeof theme;
export default theme;
