/**
 * Lovebirds Design Tokens
 *
 * Warm, gentle, encouraging — never guilt-based.
 * Clean, joyful, thoughtful — premium but approachable.
 * Feels like a "relationship coach + best friend."
 */

export const colors = {
  // Background
  background: '#F7F8F6',

  // Primary - Deep Purple (call-to-action, emphasis)
  primary: '#6A53FF',
  primaryLight: '#8B7AFF',
  primaryDark: '#5242CC',

  // Accent - Coral (gentle highlights, microcopy)
  accent: '#FF7A73',
  accentLight: '#FF9A95',
  accentDark: '#E65C55',

  // Secondary - Soft Peach (cards, secondary CTAs)
  secondary: '#FFD9A6',
  secondaryLight: '#FFE5C4',
  secondaryDark: '#FFCA7A',

  // Accent 2 - Lavender (hero headers, subtle areas)
  lavender: '#E9E4FF',
  lavenderLight: '#F5F2FF',
  lavenderDark: '#D4CCFF',

  // Card background
  card: '#FFFFFF',
  cardShadow: 'rgba(16, 24, 40, 0.06)',

  // Text
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  // Status colors
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',

  // Borders
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
};

export const typography = {
  // Font family - Inter or system UI
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },

  // Font sizes (mobile-ready, slightly larger)
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,      // Body / Primary copy
    lg: 18,        // H2 / Section heading
    xl: 20,        // H2 / Section heading
    '2xl': 22,     // H1 / Screen title
    '3xl': 26,     // H1 / Screen title (larger)
    '4xl': 32,
  },

  // Line height - generous spacing
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  // Font weights
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

  // Standard horizontal padding (mobile)
  screenPadding: 20,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,    // Card corner radius (distinct, friendly)
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const shadows = {
  // Soft, subtle shadows for cards
  card: {
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },

  cardLight: {
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  button: {
    shadowColor: '#6A53FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
};

// Minimum tappable size (44x44 px)
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

// Combined theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  touchTargets,
  animations,
};

export type Theme = typeof theme;
export default theme;
