import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Button,
  Heading1,
  BodyText,
  Caption,
} from '../../components/ui';
import { useAuthStore } from '../../stores';
import { colors, spacing, borderRadius } from '../../constants/theme';

type OnboardingGoalsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingGoals'>;
};

const goalOptions = [
  { value: 'deeper_connection', label: 'Build a deeper connection', emoji: '💕' },
  { value: 'more_fun', label: 'Have more fun together', emoji: '🎉' },
  { value: 'better_communication', label: 'Improve communication', emoji: '💬' },
  { value: 'quality_time', label: 'Spend more quality time', emoji: '⏰' },
  { value: 'new_experiences', label: 'Try new experiences', emoji: '🌟' },
  { value: 'keep_spark', label: 'Keep the spark alive', emoji: '✨' },
  { value: 'understand_better', label: 'Understand each other better', emoji: '🤝' },
  { value: 'create_memories', label: 'Create lasting memories', emoji: '📸' },
];

const OnboardingGoalsScreen: React.FC<OnboardingGoalsScreenProps> = ({
  navigation,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const { updateOnboarding } = useAuthStore();

  const toggleSelection = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else if (selected.length < 3) {
      setSelected([...selected, value]);
    }
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      updateOnboarding({ relationshipGoals: selected });
      navigation.navigate('OnboardingComplete');
    }
  };

  return (
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        {/* Progress */}
        <View style={styles.progress}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
        </View>

        <View style={styles.header}>
          <Heading1>What are your relationship goals?</Heading1>
          <BodyText color="secondary" style={styles.subtitle}>
            Select up to 3 that matter most to you
          </BodyText>
        </View>

        <View style={styles.options}>
          {goalOptions.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => toggleSelection(option.value)}
                activeOpacity={0.7}
                style={[styles.option, isSelected && styles.optionSelected]}
              >
                <BodyText style={styles.emoji}>{option.emoji}</BodyText>
                <BodyText
                  color={isSelected ? 'inverse' : 'primary'}
                  weight="medium"
                  style={styles.optionLabel}
                >
                  {option.label}
                </BodyText>
              </TouchableOpacity>
            );
          })}
        </View>

        {selected.length > 0 && (
          <Caption color="muted" style={styles.selectedCount}>
            {selected.length}/3 selected
          </Caption>
        )}

        <View style={styles.footer}>
          <Button
            title="Complete Setup"
            onPress={handleContinue}
            fullWidth
            size="lg"
            disabled={selected.length === 0}
          />
          <Button
            title="Back"
            onPress={() => navigation.goBack()}
            variant="ghost"
            fullWidth
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.md,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
  },

  optionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  emoji: {
    fontSize: 20,
    marginRight: spacing.sm,
  },

  optionLabel: {
    fontSize: 14,
  },

  selectedCount: {
    marginBottom: spacing.xl,
  },

  footer: {
    marginTop: 'auto',
    gap: spacing.sm,
  },
});

export default OnboardingGoalsScreen;
