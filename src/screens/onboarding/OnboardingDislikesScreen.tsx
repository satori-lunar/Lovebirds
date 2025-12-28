import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Button,
  Input,
  Heading1,
  BodyText,
  Caption,
} from '../../components/ui';
import { useAuthStore } from '../../stores';
import { colors, spacing, borderRadius } from '../../constants/theme';

type OnboardingDislikesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingDislikes'>;
};

const suggestedDislikes = [
  'Spicy food', 'Crowds', 'Early mornings', 'Late nights', 'Loud music',
  'Horror movies', 'Cold weather', 'Hot weather', 'Seafood', 'Heights',
  'Long drives', 'Public speaking', 'Exercise', 'Cooking', 'Cleaning',
  'Small talk', 'Waiting', 'Surprises', 'Shopping', 'Sports',
];

const OnboardingDislikesScreen: React.FC<OnboardingDislikesScreenProps> = ({
  navigation,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [customDislike, setCustomDislike] = useState('');
  const { updateOnboarding } = useAuthStore();

  const toggleSelection = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((v) => v !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const addCustomDislike = () => {
    if (customDislike.trim() && !selected.includes(customDislike.trim())) {
      setSelected([...selected, customDislike.trim()]);
      setCustomDislike('');
    }
  };

  const handleContinue = () => {
    updateOnboarding({ dislikes: selected });
    navigation.navigate('OnboardingBudget');
  };

  return (
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        {/* Progress */}
        <View style={styles.progress}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        <View style={styles.header}>
          <Heading1>Anything you'd rather avoid?</Heading1>
          <BodyText color="secondary" style={styles.subtitle}>
            This helps us suggest dates you'll actually enjoy
          </BodyText>
        </View>

        {/* Custom input */}
        <View style={styles.customInput}>
          <Input
            value={customDislike}
            onChangeText={setCustomDislike}
            placeholder="Add your own..."
            style={styles.input}
          />
          <Button
            title="Add"
            onPress={addCustomDislike}
            variant="secondary"
            size="sm"
            disabled={!customDislike.trim()}
          />
        </View>

        {/* Tags */}
        <View style={styles.tags}>
          {suggestedDislikes.map((item) => {
            const isSelected = selected.includes(item);
            return (
              <TouchableOpacity
                key={item}
                onPress={() => toggleSelection(item)}
                style={[styles.tag, isSelected && styles.tagSelected]}
              >
                <BodyText
                  color={isSelected ? 'inverse' : 'secondary'}
                  style={styles.tagText}
                >
                  {item}
                </BodyText>
              </TouchableOpacity>
            );
          })}
          {selected
            .filter((item) => !suggestedDislikes.includes(item))
            .map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => toggleSelection(item)}
                style={[styles.tag, styles.tagSelected]}
              >
                <BodyText color="inverse" style={styles.tagText}>
                  {item}
                </BodyText>
              </TouchableOpacity>
            ))}
        </View>

        {selected.length > 0 && (
          <Caption color="muted" style={styles.selectedCount}>
            {selected.length} selected
          </Caption>
        )}

        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            fullWidth
            size="lg"
          />
          <Button
            title="Skip"
            onPress={() => {
              updateOnboarding({ dislikes: [] });
              navigation.navigate('OnboardingBudget');
            }}
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

  customInput: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },

  input: {
    flex: 1,
    marginBottom: 0,
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.borderLight,
    borderWidth: 1,
    borderColor: colors.border,
  },

  tagSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },

  tagText: {
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

export default OnboardingDislikesScreen;
