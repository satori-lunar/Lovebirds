import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Card,
  Button,
  Heading1,
  Heading2,
  BodyText,
  Caption,
  CoupleAvatars,
} from '../../components/ui';
import { useAuthStore, useRelationshipStore, useDailyQuestionStore } from '../../stores';
import { colors, spacing, borderRadius } from '../../constants/theme';

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
        return { text: "Today's question is ready", action: 'Answer', emoji: '💬' };
      case 'waiting_for_partner':
        return { text: 'Waiting for your partner', action: null, emoji: '⏳' };
      case 'guessing':
        return { text: 'Time to guess!', action: 'Guess', emoji: '🤔' };
      case 'completed':
        return { text: "You're done for today!", action: null, emoji: '✨' };
      default:
        return { text: "Today's question is ready", action: 'Answer', emoji: '💬' };
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
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logo}>
              <View style={styles.logoHeart}>
                <View style={styles.heartLeft} />
                <View style={styles.heartRight} />
              </View>
            </View>
            <Heading1 style={styles.headerTitle}>Lovebirds</Heading1>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <BodyText>⚙️</BodyText>
            </TouchableOpacity>
          </View>

          {/* Couple Display */}
          <View style={styles.coupleSection}>
            <CoupleAvatars
              partnerA={{ name: user?.name }}
              partnerB={{ name: partner?.name || 'Partner' }}
              size="lg"
            />
            <BodyText color="secondary" style={styles.coupleNames}>
              {user?.name} & {partner?.name || 'Partner'}
            </BodyText>
          </View>
        </View>

        {/* Daily Question Card - Hero Position */}
        <Card variant="lavender" padding="lg" style={styles.dailyQuestionCard}>
          <View style={styles.dailyQuestionContent}>
            <BodyText style={styles.dailyQuestionEmoji}>{questionStatus.emoji}</BodyText>
            <Heading2 align="center" style={styles.dailyQuestionText}>
              {questionStatus.text}
            </Heading2>
            {questionStatus.action && (
              <Button
                title={questionStatus.action}
                onPress={handleDailyQuestionPress}
                fullWidth
                style={styles.dailyQuestionButton}
              />
            )}
            {userState === 'waiting_for_partner' && (
              <Caption color="muted" align="center" style={styles.waitingHint}>
                We'll notify you when they're done
              </Caption>
            )}
          </View>
        </Card>

        {/* Connect & Play Section */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Connect & Play</Heading2>
          <View style={styles.actionGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('PlanDate')}
            >
              <Card variant="peach" padding="md" style={styles.actionCardInner}>
                <BodyText style={styles.actionEmoji}>💕</BodyText>
                <Caption weight="medium">Plan a date</Caption>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('DateSwipe')}
            >
              <Card variant="default" padding="md" style={styles.actionCardInner}>
                <BodyText style={styles.actionEmoji}>🎯</BodyText>
                <Caption weight="medium">Swipe dates</Caption>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <Card variant="default" padding="md" style={styles.actionCardInner}>
                <BodyText style={styles.actionEmoji}>🎁</BodyText>
                <Caption weight="medium">Gift ideas</Caption>
              </Card>
            </TouchableOpacity>
          </View>
        </View>

        {/* Look Back Section */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Look Back, Feel Proud</Heading2>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Card variant="default" padding="md" style={styles.actionCardInner}>
                <BodyText style={styles.actionEmoji}>📸</BodyText>
                <Caption weight="medium">Memories</Caption>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <Card variant="default" padding="md" style={styles.actionCardInner}>
                <BodyText style={styles.actionEmoji}>📝</BodyText>
                <Caption weight="medium">Notes</Caption>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <Card variant="default" padding="md" style={styles.actionCardInner}>
                <BodyText style={styles.actionEmoji}>📊</BodyText>
                <Caption weight="medium">Statistics</Caption>
              </Card>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Section */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Coming Up</Heading2>
          <Card variant="default" padding="md">
            <View style={styles.upcomingItem}>
              <BodyText style={styles.upcomingEmoji}>🎂</BodyText>
              <View style={styles.upcomingText}>
                <BodyText weight="medium">No upcoming events</BodyText>
                <Caption color="muted">Add anniversaries and birthdays</Caption>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <BodyText color="primary">+ Add</BodyText>
              </TouchableOpacity>
            </View>
          </Card>
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

  header: {
    marginBottom: spacing.xl,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },

  logo: {
    width: 32,
    height: 32,
  },

  logoHeart: {
    width: 32,
    height: 28,
    position: 'relative',
  },

  heartLeft: {
    position: 'absolute',
    width: 18,
    height: 18,
    backgroundColor: colors.accent,
    borderRadius: 9,
    left: 0,
    top: 4,
    transform: [{ rotate: '-45deg' }],
  },

  heartRight: {
    position: 'absolute',
    width: 18,
    height: 18,
    backgroundColor: colors.primary,
    borderRadius: 9,
    right: 0,
    top: 4,
    transform: [{ rotate: '45deg' }],
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: colors.primary,
    fontSize: 20,
  },

  settingsButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  coupleSection: {
    alignItems: 'center',
  },

  coupleNames: {
    marginTop: spacing.sm,
  },

  dailyQuestionCard: {
    marginBottom: spacing.xl,
  },

  dailyQuestionContent: {
    alignItems: 'center',
  },

  dailyQuestionEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },

  dailyQuestionText: {
    marginBottom: spacing.lg,
  },

  dailyQuestionButton: {
    width: '100%',
  },

  waitingHint: {
    marginTop: spacing.sm,
  },

  section: {
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    marginBottom: spacing.md,
  },

  actionGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  actionCard: {
    flex: 1,
  },

  actionCardInner: {
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },

  actionEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },

  upcomingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  upcomingEmoji: {
    fontSize: 24,
    marginRight: spacing.md,
  },

  upcomingText: {
    flex: 1,
  },

  addButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});

export default HomeScreen;
