import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, LoveLanguage } from '../../types';
import {
  ScreenContainer,
  Button,
  Card,
  Heading1,
  Heading2,
  BodyText,
  Caption,
} from '../../components/ui';
import { useAuthStore } from '../../stores';
import { colors, spacing, borderRadius } from '../../constants/theme';

type OnboardingLoveLanguageScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingLoveLanguage'>;
};

const loveLanguageOptions: { value: LoveLanguage; label: string; emoji: string; description: string }[] = [
  {
    value: 'words_of_affirmation',
    label: 'Words of Affirmation',
    emoji: '💬',
    description: 'Verbal compliments, encouragement, and appreciation',
  },
  {
    value: 'acts_of_service',
    label: 'Acts of Service',
    emoji: '🤝',
    description: 'Actions that show care, like helping with tasks',
  },
  {
    value: 'receiving_gifts',
    label: 'Receiving Gifts',
    emoji: '🎁',
    description: 'Thoughtful presents and tokens of affection',
  },
  {
    value: 'quality_time',
    label: 'Quality Time',
    emoji: '⏰',
    description: 'Undivided attention and meaningful moments together',
  },
  {
    value: 'physical_touch',
    label: 'Physical Touch',
    emoji: '🤗',
    description: 'Hugs, holding hands, and physical closeness',
  },
];

const OnboardingLoveLanguageScreen: React.FC<OnboardingLoveLanguageScreenProps> = ({
  navigation,
}) => {
  const [selected, setSelected] = useState<LoveLanguage[]>([]);
  const { updateOnboarding } = useAuthStore();

  const toggleSelection = (value: LoveLanguage) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else if (selected.length < 2) {
      setSelected([...selected, value]);
    }
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      updateOnboarding({ loveLanguages: selected });
      navigation.navigate('OnboardingLikes');
    }
  };

  return (
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        {/* Progress */}
        <View style={styles.progress}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        <View style={styles.header}>
          <Heading1>What's your love language?</Heading1>
          <BodyText color="secondary" style={styles.subtitle}>
            Select up to 2 that resonate with you most
          </BodyText>
        </View>

        <View style={styles.options}>
          {loveLanguageOptions.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => toggleSelection(option.value)}
                activeOpacity={0.7}
              >
                <Card
                  variant={isSelected ? 'lavender' : 'default'}
                  padding="md"
                  style={[styles.option, isSelected && styles.optionSelected]}
                >
                  <View style={styles.optionContent}>
                    <BodyText style={styles.emoji}>{option.emoji}</BodyText>
                    <View style={styles.optionText}>
                      <Heading2 style={styles.optionLabel}>{option.label}</Heading2>
                      <Caption color="secondary">{option.description}</Caption>
                    </View>
                    <View
                      style={[
                        styles.checkbox,
                        isSelected && styles.checkboxSelected,
                      ]}
                    >
                      {isSelected && <BodyText color="inverse">✓</BodyText>}
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Caption color="muted" align="center" style={styles.privacy}>
            Your answers are private and help us personalize your experience.
          </Caption>
          <Button
            title="Continue"
            onPress={handleContinue}
            fullWidth
            size="lg"
            disabled={selected.length === 0}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },

  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },

  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borderLight,
  },

  progressDotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },

  header: {
    marginBottom: spacing.xl,
  },

  subtitle: {
    marginTop: spacing.sm,
  },

  options: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },

  option: {
    borderWidth: 2,
    borderColor: 'transparent',
  },

  optionSelected: {
    borderColor: colors.primary,
  },

  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  emoji: {
    fontSize: 28,
    marginRight: spacing.md,
  },

  optionText: {
    flex: 1,
  },

  optionLabel: {
    marginBottom: spacing.xs,
  },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  footer: {
    marginTop: 'auto',
  },

  privacy: {
    marginBottom: spacing.lg,
  },
});

export default OnboardingLoveLanguageScreen;
