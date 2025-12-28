import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, BudgetLevel } from '../../types';
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

type OnboardingBudgetScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingBudget'>;
};

const budgetOptions: { value: BudgetLevel; label: string; emoji: string; description: string }[] = [
  {
    value: 'free',
    label: 'Free & Creative',
    emoji: '🆓',
    description: 'Prefer dates that cost nothing or next to nothing',
  },
  {
    value: 'budget',
    label: 'Budget-Friendly',
    emoji: '💵',
    description: 'Happy with affordable options under $30',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    emoji: '💳',
    description: 'Comfortable spending $30-75 per date',
  },
  {
    value: 'generous',
    label: 'Generous',
    emoji: '💎',
    description: 'Open to nicer experiences $75-150',
  },
  {
    value: 'splurge',
    label: 'Splurge Sometimes',
    emoji: '✨',
    description: 'Occasionally go all out for special occasions',
  },
];

const OnboardingBudgetScreen: React.FC<OnboardingBudgetScreenProps> = ({
  navigation,
}) => {
  const [selected, setSelected] = useState<BudgetLevel | null>(null);
  const { updateOnboarding } = useAuthStore();

  const handleContinue = () => {
    if (selected) {
      updateOnboarding({ budgetComfort: selected });
      navigation.navigate('OnboardingEnergy');
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
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        <View style={styles.header}>
          <Heading1>What's your date budget comfort?</Heading1>
          <BodyText color="secondary" style={styles.subtitle}>
            We'll suggest dates that fit your budget
          </BodyText>
        </View>

        <View style={styles.options}>
          {budgetOptions.map((option) => {
            const isSelected = selected === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => setSelected(option.value)}
                activeOpacity={0.7}
              >
                <Card
                  variant={isSelected ? 'peach' : 'default'}
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
                        styles.radio,
                        isSelected && styles.radioSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            fullWidth
            size="lg"
            disabled={!selected}
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
    gap: spacing.md,
    marginBottom: spacing.xl,
  },

  option: {
    borderWidth: 2,
    borderColor: 'transparent',
  },

  optionSelected: {
    borderColor: colors.accent,
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

  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    borderColor: colors.accent,
  },

  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
  },

  footer: {
    marginTop: 'auto',
    gap: spacing.sm,
  },
});

export default OnboardingBudgetScreen;
