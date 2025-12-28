import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, touchTargets } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const base: ViewStyle[] = [styles.base];

    // Variant styles
    switch (variant) {
      case 'primary':
        base.push(styles.primary);
        break;
      case 'secondary':
        base.push(styles.secondary);
        break;
      case 'outline':
        base.push(styles.outline);
        break;
      case 'ghost':
        base.push(styles.ghost);
        break;
    }

    // Size styles
    switch (size) {
      case 'sm':
        base.push(styles.sizeSm);
        break;
      case 'md':
        base.push(styles.sizeMd);
        break;
      case 'lg':
        base.push(styles.sizeLg);
        break;
    }

    if (fullWidth) {
      base.push(styles.fullWidth);
    }

    if (disabled) {
      base.push(styles.disabled);
    }

    return base;
  };

  const getTextStyle = (): TextStyle[] => {
    const base: TextStyle[] = [styles.text];

    switch (variant) {
      case 'primary':
        base.push(styles.textPrimary);
        break;
      case 'secondary':
        base.push(styles.textSecondary);
        break;
      case 'outline':
        base.push(styles.textOutline);
        break;
      case 'ghost':
        base.push(styles.textGhost);
        break;
    }

    switch (size) {
      case 'sm':
        base.push(styles.textSm);
        break;
      case 'md':
        base.push(styles.textMd);
        break;
      case 'lg':
        base.push(styles.textLg);
        break;
    }

    if (disabled) {
      base.push(styles.textDisabled);
    }

    return base;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.text.inverse : colors.primary}
          size="small"
        />
      ) : (
        <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    minHeight: touchTargets.minimum,
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
    ...shadows.button,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Sizes
  sizeSm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  sizeMd: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: touchTargets.minimum,
  },
  sizeLg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minHeight: touchTargets.large,
  },

  fullWidth: {
    width: '100%',
  },

  disabled: {
    opacity: 0.5,
  },

  // Text base
  text: {
    fontWeight: typography.fontWeight.semiBold,
  },

  // Text variants
  textPrimary: {
    color: colors.text.inverse,
  },
  textSecondary: {
    color: colors.text.primary,
  },
  textOutline: {
    color: colors.primary,
  },
  textGhost: {
    color: colors.primary,
  },

  // Text sizes
  textSm: {
    fontSize: typography.fontSize.sm,
  },
  textMd: {
    fontSize: typography.fontSize.base,
  },
  textLg: {
    fontSize: typography.fontSize.lg,
  },

  textDisabled: {
    opacity: 0.7,
  },
});

export default Button;
