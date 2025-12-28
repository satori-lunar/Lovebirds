import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'lavender' | 'peach';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  style,
}) => {
  const getCardStyle = (): ViewStyle[] => {
    const base: ViewStyle[] = [styles.base];

    switch (variant) {
      case 'default':
        base.push(styles.default);
        break;
      case 'elevated':
        base.push(styles.elevated);
        break;
      case 'lavender':
        base.push(styles.lavender);
        break;
      case 'peach':
        base.push(styles.peach);
        break;
    }

    switch (padding) {
      case 'none':
        base.push(styles.paddingNone);
        break;
      case 'sm':
        base.push(styles.paddingSm);
        break;
      case 'md':
        base.push(styles.paddingMd);
        break;
      case 'lg':
        base.push(styles.paddingLg);
        break;
    }

    return base;
  };

  return <View style={[...getCardStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },

  // Variants
  default: {
    backgroundColor: colors.card,
    ...shadows.cardLight,
  },
  elevated: {
    backgroundColor: colors.card,
    ...shadows.card,
  },
  lavender: {
    backgroundColor: colors.lavender,
  },
  peach: {
    backgroundColor: colors.secondary,
  },

  // Padding
  paddingNone: {
    padding: 0,
  },
  paddingSm: {
    padding: spacing.sm,
  },
  paddingMd: {
    padding: spacing.md,
  },
  paddingLg: {
    padding: spacing.lg,
  },
});

export default Card;
