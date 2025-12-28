import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import {
  Card,
  Button,
  Heading1,
  Heading2,
  BodyText,
  Caption,
  CoupleAvatars,
} from '../../components/ui';
import { useAuthStore, useRelationshipStore, useDailyQuestionStore } from '../../stores';
import { colors, spacing, borderRadius, shadows } from '../../constants/theme';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuthStore();
  const { partner, relationship } = useRelationshipStore();
  const { currentQuestion, userState, initializeDailyQuestion } = useDailyQuestionStore();

  useEffect(() => {
    if (user && relationship) {
      initializeDailyQuestion(relationship.id, user.id);
    }
  }, [user, relationship]);

  const getDailyQuestionStatus = () => {
    switch (userState) {
      case 'not_started':
      case 'answering':
        return { text: "Today's question is ready!", action: 'Answer Now', emoji: '💬' };
      case 'waiting_for_partner':
        return { text: 'Waiting for your partner', action: null, emoji: '⏳' };
      case 'guessing':
        return { text: 'Time to guess!', action: 'Make Your Guess', emoji: '🤔' };
      case 'completed':
        return { text: "You're done for today!", action: null, emoji: '✨' };
      default:
        return { text: "Today's question is ready!", action: 'Answer Now', emoji: '💬' };
    }
  };

  const questionStatus = getDailyQuestionStatus();

  const handleDailyQuestionPress = () => {
    if (userState === 'not_started' || userState === 'answering') {
      navigation.navigate('DailyQuestionAnswer');
    } else if (userState === 'guessing') {
      navigation.navigate('DailyQuestionGuess');
    }
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Gradient Header */}
      <LinearGradient
        colors={['#EC4899', '#A855F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Caption style={styles.greeting}>Good morning</Caption>
              <Heading1 style={styles.userName}>{user?.name || 'You'} 💕</Heading1>
            </View>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <BodyText style={styles.settingsIcon}>⚙️</BodyText>
            </TouchableOpacity>
          </View>

          {/* Partner Connection */}
          <View style={styles.partnerSection}>
            <View style={styles.partnerPill}>
              <View style={styles.partnerDot} />
              <Caption style={styles.partnerText}>
                Connected with {partner?.name || 'Partner'}
              </Caption>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Today's Question Card */}
        <TouchableOpacity
          style={styles.questionCard}
          onPress={handleDailyQuestionPress}
          activeOpacity={0.9}
          disabled={!questionStatus.action}
        >
          <LinearGradient
            colors={['#FDF2F8', '#FFFFFF']}
            style={styles.questionCardGradient}
          >
            <View style={styles.questionCardContent}>
              <View style={styles.questionBadge}>
                <BodyText style={styles.questionEmoji}>{questionStatus.emoji}</BodyText>
              </View>
              <Caption style={styles.questionLabel}>Today's Question</Caption>
              <BodyText style={styles.questionText}>{questionStatus.text}</BodyText>
              {questionStatus.action && (
                <View style={styles.questionAction}>
                  <BodyText style={styles.questionActionText}>{questionStatus.action} →</BodyText>
                </View>
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Heading2 style={styles.statNumber}>7</Heading2>
            <Caption color="secondary">Day Streak</Caption>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Heading2 style={styles.statNumber}>23</Heading2>
            <Caption color="secondary">Questions</Caption>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Heading2 style={styles.statNumber}>5</Heading2>
            <Caption color="secondary">Dates</Caption>
          </View>
        </View>

        {/* Explore Together */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Explore Together</Heading2>
          <View style={styles.exploreGrid}>
            <TouchableOpacity style={styles.exploreItem}>
              <LinearGradient
                colors={[colors.pink[50], colors.pink[100]]}
                style={styles.exploreItemGradient}
              >
                <BodyText style={styles.exploreEmoji}>💗</BodyText>
                <Caption style={styles.exploreLabel}>Love Language</Caption>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.exploreItem}
              onPress={() => navigation.navigate('PlanDate')}
            >
              <LinearGradient
                colors={[colors.purple[50], colors.purple[100]]}
                style={styles.exploreItemGradient}
              >
                <BodyText style={styles.exploreEmoji}>📅</BodyText>
                <Caption style={styles.exploreLabel}>Plan a Date</Caption>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.exploreItem}>
              <LinearGradient
                colors={[colors.pink[50], colors.pink[100]]}
                style={styles.exploreItemGradient}
              >
                <BodyText style={styles.exploreEmoji}>🎁</BodyText>
                <Caption style={styles.exploreLabel}>Gift Ideas</Caption>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.exploreItem}>
              <LinearGradient
                colors={[colors.purple[50], colors.purple[100]]}
                style={styles.exploreItemGradient}
              >
                <BodyText style={styles.exploreEmoji}>📆</BodyText>
                <Caption style={styles.exploreLabel}>Important Dates</Caption>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Coming Up */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Coming Up</Heading2>
          <View style={styles.upcomingCard}>
            <View style={styles.upcomingItem}>
              <View style={[styles.upcomingIcon, { backgroundColor: colors.pink[100] }]}>
                <BodyText>❤️</BodyText>
              </View>
              <View style={styles.upcomingText}>
                <BodyText weight="medium">Valentine's Day</BodyText>
                <Caption color="secondary">February 14</Caption>
              </View>
              <Caption style={styles.upcomingDays}>48 days</Caption>
            </View>
          </View>
        </View>

        {/* Memories CTA */}
        <TouchableOpacity style={styles.memoriesCard}>
          <LinearGradient
            colors={['#EC4899', '#A855F7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.memoriesGradient}
          >
            <View style={styles.memoriesContent}>
              <BodyText style={styles.memoriesEmoji}>📸</BodyText>
              <View style={styles.memoriesText}>
                <BodyText style={styles.memoriesTitle}>Save Your Memories</BodyText>
                <Caption style={styles.memoriesSubtitle}>Capture special moments together</Caption>
              </View>
              <BodyText style={styles.memoriesArrow}>→</BodyText>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  headerGradient: {
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.screenPadding,
    borderBottomLeftRadius: borderRadius['3xl'],
    borderBottomRightRadius: borderRadius['3xl'],
  },
  headerContent: {},
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  greeting: {
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 18,
  },
  partnerSection: {
    alignItems: 'flex-start',
  },
  partnerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  partnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ADE80',
    marginRight: spacing.sm,
  },
  partnerText: {
    color: '#FFFFFF',
  },

  // Content
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing['3xl'],
    marginTop: -spacing.lg,
  },

  // Question Card
  questionCard: {
    marginBottom: spacing.lg,
    borderRadius: borderRadius['2xl'],
    ...shadows.card,
  },
  questionCardGradient: {
    borderRadius: borderRadius['2xl'],
    padding: spacing.lg,
  },
  questionCardContent: {
    alignItems: 'center',
  },
  questionBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.pink[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  questionEmoji: {
    fontSize: 28,
  },
  questionLabel: {
    color: colors.pink[600],
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  questionAction: {
    backgroundColor: colors.pink[500],
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  questionActionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.xl,
    ...shadows.cardLight,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: colors.pink[500],
    fontSize: 24,
    marginBottom: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },

  // Section
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.text.primary,
  },

  // Explore Grid
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  exploreItem: {
    width: '48%',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  exploreItemGradient: {
    padding: spacing.md,
    alignItems: 'center',
    minHeight: 90,
    justifyContent: 'center',
  },
  exploreEmoji: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  exploreLabel: {
    fontWeight: '600',
    color: colors.text.primary,
  },

  // Upcoming
  upcomingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    ...shadows.cardLight,
  },
  upcomingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  upcomingText: {
    flex: 1,
  },
  upcomingDays: {
    color: colors.pink[500],
    fontWeight: '600',
  },

  // Memories CTA
  memoriesCard: {
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    ...shadows.card,
  },
  memoriesGradient: {
    padding: spacing.lg,
  },
  memoriesContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memoriesEmoji: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  memoriesText: {
    flex: 1,
  },
  memoriesTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  memoriesSubtitle: {
    color: 'rgba(255,255,255,0.8)',
  },
  memoriesArrow: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

export default HomeScreen;
