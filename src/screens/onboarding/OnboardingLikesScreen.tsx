import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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

type OnboardingLikesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingLikes'>;
};

const suggestedLikes = [
  'Italian food', 'Sushi', 'Coffee', 'Tea', 'Wine', 'Hiking',
  'Movies', 'Music', 'Reading', 'Gaming', 'Cooking', 'Travel',
  'Beach', 'Mountains', 'Art', 'Photography', 'Dancing', 'Sports',
  'Yoga', 'Camping', 'Concerts', 'Museums', 'Shopping', 'Spa days',
];

const OnboardingLikesScreen: React.FC<OnboardingLikesScreenProps> = ({
  navigation,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [customLike, setCustomLike] = useState('');
  const { updateOnboarding } = useAuthStore();

  const toggleSelection = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((v) => v !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const addCustomLike = () => {
    if (customLike.trim() && !selected.includes(customLike.trim())) {
      setSelected([...selected, customLike.trim()]);
      setCustomLike('');
    }
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      updateOnboarding({ likes: selected });
      navigation.navigate('OnboardingDislikes');
    }
  };

  return (
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        {/* Progress */}
        <View style={styles.progress}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        <View style={styles.header}>
          <Heading1>What do you like?</Heading1>
          <BodyText color="secondary" style={styles.subtitle}>
            Select things you enjoy - this helps us suggest great dates!
          </BodyText>
        </View>

        {/* Custom input */}
        <View style={styles.customInput}>
          <Input
            value={customLike}
            onChangeText={setCustomLike}
            placeholder="Add your own..."
            style={styles.input}
          />
          <Button
            title="Add"
            onPress={addCustomLike}
            variant="secondary"
            size="sm"
            disabled={!customLike.trim()}
          />
        </View>

        {/* Tags */}
        <View style={styles.tags}>
          {suggestedLikes.map((item) => {
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
            .filter((item) => !suggestedLikes.includes(item))
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
    backgroundColor: colors.primary,
    borderColor: colors.primary,
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

export default OnboardingLikesScreen;
