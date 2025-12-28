import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, DateIdea, BudgetLevel, EnergyLevel } from '../../types';
import {
  ScreenContainer,
  Card,
  Button,
  Heading1,
  Heading2,
  BodyText,
  Caption,
} from '../../components/ui';
import { useAuthStore, useRelationshipStore, useDatesStore } from '../../stores';
import { colors, spacing, borderRadius } from '../../constants/theme';

type PlanDateScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PlanDate'>;
};

const budgetEmojis: Record<BudgetLevel, string> = {
  free: '🆓',
  budget: '💵',
  moderate: '💳',
  generous: '💎',
  splurge: '✨',
};

const energyEmojis: Record<EnergyLevel, string> = {
  low: '🛋️',
  medium_low: '☕',
  medium: '⚖️',
  medium_high: '🚶',
  high: '⚡',
};

const PlanDateScreen: React.FC<PlanDateScreenProps> = ({ navigation }) => {
  const [dateIdeas, setDateIdeas] = useState<DateIdea[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateIdea | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);

  const { user, onboarding } = useAuthStore();
  const { relationship } = useRelationshipStore();
  const { generateDateIdeas, planDate } = useDatesStore();

  useEffect(() => {
    // Generate 3 tailored date ideas based on user preferences
    const ideas = generateDateIdeas(3, {
      budget: onboarding?.budgetComfort,
      energy: onboarding?.energyLevel,
    });
    setDateIdeas(ideas);
  }, []);

  const handleRefresh = () => {
    const ideas = generateDateIdeas(3, {
      budget: onboarding?.budgetComfort,
      energy: onboarding?.energyLevel,
    });
    setDateIdeas(ideas);
    setSelectedDate(null);
  };

  const handleSelectDate = (idea: DateIdea) => {
    setSelectedDate(idea);
    setIsScheduling(true);
  };

  const handleScheduleDate = () => {
    if (!selectedDate || !user || !relationship) return;

    // Schedule for this weekend
    const nextSaturday = new Date();
    nextSaturday.setDate(nextSaturday.getDate() + (6 - nextSaturday.getDay()) % 7 + 1);

    planDate(
      selectedDate,
      nextSaturday,
      user.id,
      relationship.id
    );

    navigation.goBack();
  };

  return (
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BodyText color="secondary">← Back</BodyText>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Heading1>Plan a Date</Heading1>
          <BodyText color="secondary" style={styles.subtitle}>
            Here are 3 date ideas tailored just for you
          </BodyText>
        </View>

        {/* Date Ideas */}
        <View style={styles.dateIdeas}>
          {dateIdeas.map((idea, index) => {
            const isSelected = selectedDate?.id === idea.id;
            return (
              <TouchableOpacity
                key={idea.id}
                onPress={() => handleSelectDate(idea)}
                activeOpacity={0.7}
              >
                <Card
                  variant={isSelected ? 'lavender' : 'default'}
                  padding="lg"
                  style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                >
                  <View style={styles.dateCardHeader}>
                    <View style={styles.dateNumber}>
                      <BodyText color="inverse" weight="bold">
                        {index + 1}
                      </BodyText>
                    </View>
                    <View style={styles.dateTags}>
                      <View style={styles.tag}>
                        <Caption>{budgetEmojis[idea.budgetLevel]}</Caption>
                      </View>
                      <View style={styles.tag}>
                        <Caption>{energyEmojis[idea.energyLevel]}</Caption>
                      </View>
                    </View>
                  </View>

                  <Heading2 style={styles.dateTitle}>{idea.title}</Heading2>
                  <BodyText color="secondary" style={styles.dateDescription}>
                    {idea.description}
                  </BodyText>

                  <View style={styles.dateFooter}>
                    <Caption color="muted">
                      {idea.duration === 'quick'
                        ? '~1 hour'
                        : idea.duration === 'half_day'
                        ? '2-4 hours'
                        : idea.duration === 'full_day'
                        ? 'Full day'
                        : 'Overnight'}
                    </Caption>
                    <Caption color="muted">{idea.location}</Caption>
                  </View>

                  {isSelected && (
                    <View style={styles.selectedBadge}>
                      <BodyText color="primary" weight="semiBold">
                        ✓ Selected
                      </BodyText>
                    </View>
                  )}
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Refresh Button */}
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <BodyText color="primary">🔄 Show me different ideas</BodyText>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.footer}>
          {selectedDate ? (
            <Button
              title="Schedule This Date"
              onPress={handleScheduleDate}
              fullWidth
              size="lg"
            />
          ) : (
            <Caption color="muted" align="center">
              Tap a date idea to select it
            </Caption>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
    paddingVertical: spacing.sm,
  },

  header: {
    marginBottom: spacing.xl,
  },

  subtitle: {
    marginTop: spacing.sm,
  },

  dateIdeas: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },

  dateCard: {
    borderWidth: 2,
    borderColor: 'transparent',
  },

  dateCardSelected: {
    borderColor: colors.primary,
  },

  dateCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  dateNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dateTags: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.full,
  },

  dateTitle: {
    marginBottom: spacing.sm,
  },

  dateDescription: {
    marginBottom: spacing.md,
    lineHeight: 22,
  },

  dateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  selectedBadge: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
    alignItems: 'center',
  },

  refreshButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.xl,
  },

  footer: {
    marginTop: 'auto',
  },
});

export default PlanDateScreen;
