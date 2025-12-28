import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, PlannedDate } from '../../types';
import {
  ScreenContainer,
  Card,
  Button,
  Heading1,
  Heading2,
  BodyText,
  Caption,
} from '../../components/ui';
import { useDatesStore } from '../../stores';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { format } from 'date-fns';

const DatesScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { plannedDates } = useDatesStore();

  const upcomingDates = plannedDates.filter(
    (d) => d.status === 'planned' && new Date(d.plannedFor) >= new Date()
  );

  const pastDates = plannedDates.filter(
    (d) => d.status === 'completed' || new Date(d.plannedFor) < new Date()
  );

  const renderDateCard = ({ item }: { item: PlannedDate }) => (
    <Card variant="default" padding="md" style={styles.dateCard}>
      <View style={styles.dateCardContent}>
        <View style={styles.dateInfo}>
          <Heading2 style={styles.dateTitle}>{item.dateIdea.title}</Heading2>
          <BodyText color="secondary" style={styles.dateDescription}>
            {item.dateIdea.description}
          </BodyText>
          <Caption color="muted" style={styles.dateDate}>
            {format(new Date(item.plannedFor), 'EEEE, MMM d')}
          </Caption>
        </View>
        <View style={styles.dateBadge}>
          <BodyText>
            {item.dateIdea.category === 'romantic'
              ? '💕'
              : item.dateIdea.category === 'adventure'
              ? '🎯'
              : item.dateIdea.category === 'food'
              ? '🍽️'
              : '✨'}
          </BodyText>
        </View>
      </View>
    </Card>
  );

  return (
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Heading1>Dates</Heading1>
          <BodyText color="secondary">
            Plan your next adventure together
          </BodyText>
        </View>

        {/* Action Cards */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('PlanDate')}
          >
            <Card variant="lavender" padding="lg" style={styles.actionCardInner}>
              <BodyText style={styles.actionEmoji}>💕</BodyText>
              <Heading2 align="center" style={styles.actionTitle}>
                Plan for Partner
              </Heading2>
              <Caption color="secondary" align="center">
                Get 3 tailored date ideas
              </Caption>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('DateSwipe')}
          >
            <Card variant="peach" padding="lg" style={styles.actionCardInner}>
              <BodyText style={styles.actionEmoji}>🎯</BodyText>
              <Heading2 align="center" style={styles.actionTitle}>
                Swipe Together
              </Heading2>
              <Caption color="secondary" align="center">
                Find dates you both love
              </Caption>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Upcoming Dates */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Upcoming</Heading2>
          {upcomingDates.length > 0 ? (
            upcomingDates.map((date) => (
              <View key={date.id}>
                {renderDateCard({ item: date })}
              </View>
            ))
          ) : (
            <Card variant="default" padding="lg">
              <View style={styles.emptyState}>
                <BodyText style={styles.emptyEmoji}>📅</BodyText>
                <BodyText color="secondary" align="center">
                  No dates planned yet
                </BodyText>
                <Caption color="muted" align="center">
                  Plan something special together!
                </Caption>
              </View>
            </Card>
          )}
        </View>

        {/* Past Dates */}
        {pastDates.length > 0 && (
          <View style={styles.section}>
            <Heading2 style={styles.sectionTitle}>Past Dates</Heading2>
            {pastDates.map((date) => (
              <View key={date.id}>
                {renderDateCard({ item: date })}
              </View>
            ))}
          </View>
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
    marginBottom: spacing.xl,
  },

  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },

  actionCard: {
    flex: 1,
  },

  actionCardInner: {
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },

  actionEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },

  actionTitle: {
    marginBottom: spacing.xs,
  },

  section: {
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    marginBottom: spacing.md,
  },

  dateCard: {
    marginBottom: spacing.md,
  },

  dateCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  dateInfo: {
    flex: 1,
  },

  dateTitle: {
    marginBottom: spacing.xs,
  },

  dateDescription: {
    marginBottom: spacing.sm,
    fontSize: 14,
  },

  dateDate: {
    marginTop: spacing.xs,
  },

  dateBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },

  emptyEmoji: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
});

export default DatesScreen;
