import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'accent' | 'error';
  align?: 'left' | 'center' | 'right';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  style?: TextStyle;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight,
  style,
}) => {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'body':
        return styles.body;
      case 'bodySmall':
        return styles.bodySmall;
      case 'caption':
        return styles.caption;
      case 'label':
        return styles.label;
      default:
        return styles.body;
    }
  };

  const getColorStyle = (): TextStyle => {
    switch (color) {
      case 'primary':
        return { color: colors.text.primary };
      case 'secondary':
        return { color: colors.text.secondary };
      case 'muted':
        return { color: colors.text.muted };
      case 'inverse':
        return { color: colors.text.inverse };
      case 'accent':
        return { color: colors.accent };
      case 'error':
        return { color: colors.error };
      default:
        return { color: colors.text.primary };
    }
  };

  const getWeightStyle = (): TextStyle => {
    if (!weight) return {};
    return { fontWeight: typography.fontWeight[weight] };
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        getColorStyle(),
        { textAlign: align },
        getWeightStyle(),
        style,
      ]}
    >
      {children}
    </Text>
  );
};

// Convenience components
export const Heading1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
);

export const BodyText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
);

const styles = StyleSheet.create({
  h1: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
    letterSpacing: -0.5,
  },

  h2: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: typography.fontSize.xl * typography.lineHeight.tight,
  },

  h3: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
  },

  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },

  bodySmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },

  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },

  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
});

export default Typography;
