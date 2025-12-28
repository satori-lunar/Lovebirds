import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, DateIdea } from '../../types';
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

type DateSwipeResultScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DateSwipeResult'>;
};

const DateSwipeResultScreen: React.FC<DateSwipeResultScreenProps> = ({
  navigation,
}) => {
  const [selectedDate, setSelectedDate] = useState<DateIdea | null>(null);
  const { user } = useAuthStore();
  const { relationship } = useRelationshipStore();
  const { getMatches, selectFinalDate, endSwipeSession, planDate } = useDatesStore();

  const matches = getMatches();

  // If we have matches, take top 3
  const topMatches = matches.slice(0, 3);

  // If no matches found, show different UI
  const hasMatches = topMatches.length > 0;

  const handleSelectMatch = (date: DateIdea) => {
    setSelectedDate(date);
    selectFinalDate(date.id);
  };

  const handleScheduleDate = () => {
    if (!selectedDate || !user || !relationship) return;

    // Schedule for this weekend
    const nextSaturday = new Date();
    nextSaturday.setDate(nextSaturday.getDate() + (6 - nextSaturday.getDay()) % 7 + 1);

    planDate(selectedDate, nextSaturday, user.id, relationship.id);
    endSwipeSession();
    navigation.navigate('MainTabs');
  };

  const handleDone = () => {
    endSwipeSession();
    navigation.navigate('MainTabs');
  };

  return (
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        {hasMatches ? (
          /* Matches Found */
          <>
            <View style={styles.header}>
              <BodyText style={styles.emoji}>🎉</BodyText>
              <Heading1 align="center" style={styles.title}>
                You both liked these!
              </Heading1>
              <BodyText color="secondary" align="center">
                Here are the date ideas you and your partner both swiped right on.
              </BodyText>
            </View>

            <View style={styles.matches}>
              {topMatches.map((date, index) => {
                const isSelected = selectedDate?.id === date.id;
                return (
                  <TouchableOpacity
                    key={date.id}
                    onPress={() => handleSelectMatch(date)}
                    activeOpacity={0.7}
                  >
                    <Card
                      variant={isSelected ? 'lavender' : 'default'}
                      padding="md"
                      style={[styles.matchCard, isSelected && styles.matchCardSelected]}
                    >
                      <View style={styles.matchContent}>
                        <View style={styles.matchNumber}>
                          <BodyText color="inverse" weight="bold">
                            {index + 1}
                          </BodyText>
                        </View>
                        <View style={styles.matchInfo}>
                          <Heading2 style={styles.matchTitle}>{date.title}</Heading2>
                          <Caption color="secondary">{date.description}</Caption>
                        </View>
                        {isSelected && (
                          <BodyText color="primary" style={styles.checkmark}>
                            ✓
                          </BodyText>
                        )}
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })}
            </View>

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
                  Tap a match to select it
                </Caption>
              )}
              <Button
                title="Maybe Later"
                onPress={handleDone}
                variant="ghost"
                fullWidth
              />
            </View>
          </>
        ) : (
          /* No Matches Found */
          <>
            <View style={styles.header}>
              <BodyText style={styles.emoji}>💭</BodyText>
              <Heading1 align="center" style={styles.title}>
                No matches this time
              </Heading1>
              <BodyText color="secondary" align="center">
                You and your partner didn't swipe right on the same dates this round.
                That's okay! Try again or plan a date yourself.
              </BodyText>
            </View>

            <View style={styles.noMatchActions}>
              <Button
                title="Try Again"
                onPress={() => navigation.replace('DateSwipe')}
                fullWidth
                size="lg"
              />
              <Button
                title="Plan a Date Instead"
                onPress={() => {
                  endSwipeSession();
                  navigation.replace('PlanDate');
                }}
                variant="outline"
                fullWidth
                size="lg"
              />
              <Button
                title="Back to Home"
                onPress={handleDone}
                variant="ghost"
                fullWidth
              />
            </View>
          </>
        )}
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

  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  emoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },

  title: {
    marginBottom: spacing.md,
  },

  matches: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },

  matchCard: {
    borderWidth: 2,
    borderColor: 'transparent',
  },

  matchCardSelected: {
    borderColor: colors.primary,
  },

  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  matchNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  matchInfo: {
    flex: 1,
  },

  matchTitle: {
    marginBottom: spacing.xs,
  },

  checkmark: {
    fontSize: 24,
    marginLeft: spacing.sm,
  },

  footer: {
    marginTop: 'auto',
    gap: spacing.sm,
  },

  noMatchActions: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});

export default DateSwipeResultScreen;
