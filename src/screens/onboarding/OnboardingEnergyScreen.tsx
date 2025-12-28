import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, EnergyLevel } from '../../types';
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

type OnboardingEnergyScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingEnergy'>;
};

const energyOptions: { value: EnergyLevel; label: string; emoji: string; description: string }[] = [
  {
    value: 'low',
    label: 'Relaxed',
    emoji: '🛋️',
    description: 'Prefer calm, low-key activities',
  },
  {
    value: 'medium_low',
    label: 'Easy Going',
    emoji: '☕',
    description: 'Light activities with some rest time',
  },
  {
    value: 'medium',
    label: 'Balanced',
    emoji: '⚖️',
    description: 'Mix of active and relaxing activities',
  },
  {
    value: 'medium_high',
    label: 'Active',
    emoji: '🚶',
    description: 'Enjoy staying busy and exploring',
  },
  {
    value: 'high',
    label: 'Energetic',
    emoji: '⚡',
    description: 'Love adventure and physical activities',
  },
];

const OnboardingEnergyScreen: React.FC<OnboardingEnergyScreenProps> = ({
  navigation,
}) => {
  const [selected, setSelected] = useState<EnergyLevel | null>(null);
  const { updateOnboarding } = useAuthStore();

  const handleContinue = () => {
    if (selected) {
      updateOnboarding({ energyLevel: selected });
      navigation.navigate('OnboardingGoals');
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
          <View style={styles.progressDot} />
        </View>

        <View style={styles.header}>
          <Heading1>What's your energy level?</Heading1>
          <BodyText color="secondary" style={styles.subtitle}>
            This helps us suggest dates that match your vibe
          </BodyText>
        </View>

        <View style={styles.options}>
          {energyOptions.map((option) => {
            const isSelected = selected === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => setSelected(option.value)}
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
    borderColor: colors.primary,
  },

  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },

  footer: {
    marginTop: 'auto',
    gap: spacing.sm,
  },
});

export default OnboardingEnergyScreen;
