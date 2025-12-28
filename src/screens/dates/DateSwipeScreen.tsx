import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
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

type DateSwipeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DateSwipe'>;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const DateSwipeScreen: React.FC<DateSwipeScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [swipedIds, setSwipedIds] = useState<{ id: string; liked: boolean }[]>([]);

  const { user } = useAuthStore();
  const { relationship } = useRelationshipStore();
  const { currentSwipeSession, startSwipeSession, submitSwipe, endSwipeSession } =
    useDatesStore();

  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    if (relationship && !currentSwipeSession) {
      startSwipeSession(relationship.id);
    }
  }, [relationship]);

  useEffect(() => {
    if (isSessionActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isSessionActive) {
      handleSessionEnd();
    }
  }, [timeLeft, isSessionActive]);

  const dateIdeas = currentSwipeSession?.dateIdeas || [];
  const currentDate = dateIdeas[currentIndex];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => handleSwipe(true));
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => handleSwipe(false));
  };

  const handleSwipe = (liked: boolean) => {
    if (!currentDate || !user) return;

    setSwipedIds([...swipedIds, { id: currentDate.id, liked }]);
    submitSwipe(user.id, currentDate.id, liked);

    position.setValue({ x: 0, y: 0 });

    if (currentIndex < dateIdeas.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSessionEnd();
    }
  };

  const handleSessionEnd = () => {
    setIsSessionActive(false);
    navigation.replace('DateSwipeResult');
  };

  const handleStart = () => {
    setIsSessionActive(true);
    setTimeLeft(120);
  };

  const cardStyle = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      {
        rotate: position.x.interpolate({
          inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
          outputRange: ['-10deg', '0deg', '10deg'],
        }),
      },
    ],
  };

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  if (!isSessionActive) {
    return (
      <ScreenContainer centered withPadding>
        <View style={styles.startContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <BodyText color="secondary">← Back</BodyText>
          </TouchableOpacity>

          <View style={styles.startContent}>
            <BodyText style={styles.startEmoji}>🎯</BodyText>
            <Heading1 align="center" style={styles.startTitle}>
              Swipe Dates Together
            </Heading1>
            <BodyText color="secondary" align="center" style={styles.startDescription}>
              You'll both have 2 minutes to swipe through 30 date ideas.{'\n'}
              We'll show you the ones you both liked!
            </BodyText>

            <View style={styles.instructions}>
              <View style={styles.instructionItem}>
                <BodyText style={styles.instructionEmoji}>👈</BodyText>
                <Caption color="secondary">Swipe left to skip</Caption>
              </View>
              <View style={styles.instructionItem}>
                <BodyText style={styles.instructionEmoji}>👉</BodyText>
                <Caption color="secondary">Swipe right to like</Caption>
              </View>
            </View>

            <Button
              title="Start Swiping"
              onPress={handleStart}
              fullWidth
              size="lg"
              style={styles.startButton}
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer withPadding>
      <View style={styles.container}>
        {/* Timer */}
        <View style={styles.header}>
          <View style={styles.timer}>
            <BodyText
              color={timeLeft < 30 ? 'error' : 'secondary'}
              weight="semiBold"
            >
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </BodyText>
          </View>
          <Caption color="muted">
            {currentIndex + 1} / {dateIdeas.length}
          </Caption>
        </View>

        {/* Card Stack */}
        <View style={styles.cardContainer}>
          {currentDate && (
            <Animated.View
              style={[styles.card, cardStyle]}
              {...panResponder.panHandlers}
            >
              {/* Like/Nope Labels */}
              <Animated.View style={[styles.likeLabel, { opacity: likeOpacity }]}>
                <BodyText color="inverse" weight="bold" style={styles.labelText}>
                  YES!
                </BodyText>
              </Animated.View>
              <Animated.View style={[styles.nopeLabel, { opacity: nopeOpacity }]}>
                <BodyText color="inverse" weight="bold" style={styles.labelText}>
                  NOPE
                </BodyText>
              </Animated.View>

              <Card variant="default" padding="lg" style={styles.dateCard}>
                <View style={styles.cardContent}>
                  <Heading1 style={styles.dateTitle}>{currentDate.title}</Heading1>
                  <BodyText color="secondary" style={styles.dateDescription}>
                    {currentDate.description}
                  </BodyText>

                  <View style={styles.tags}>
                    <View style={styles.tag}>
                      <Caption color="secondary">{currentDate.budgetLevel}</Caption>
                    </View>
                    <View style={styles.tag}>
                      <Caption color="secondary">{currentDate.energyLevel}</Caption>
                    </View>
                    <View style={styles.tag}>
                      <Caption color="secondary">{currentDate.location}</Caption>
                    </View>
                  </View>
                </View>
              </Card>
            </Animated.View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={swipeLeft}>
            <BodyText style={styles.actionEmoji}>👎</BodyText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.likeButton]}
            onPress={swipeRight}
          >
            <BodyText style={styles.actionEmoji}>💕</BodyText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.md,
  },

  startContainer: {
    flex: 1,
    width: '100%',
  },

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm,
  },

  startContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  startEmoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },

  startTitle: {
    marginBottom: spacing.md,
  },

  startDescription: {
    marginBottom: spacing.xl,
    lineHeight: 24,
  },

  instructions: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginBottom: spacing['2xl'],
  },

  instructionItem: {
    alignItems: 'center',
  },

  instructionEmoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },

  startButton: {
    marginTop: spacing.lg,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  timer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.lavender,
    borderRadius: borderRadius.full,
  },

  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    width: SCREEN_WIDTH - spacing.screenPadding * 2,
    position: 'absolute',
  },

  likeLabel: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
    transform: [{ rotate: '-15deg' }],
    backgroundColor: colors.success,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },

  nopeLabel: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 1,
    transform: [{ rotate: '15deg' }],
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },

  labelText: {
    fontSize: 20,
    letterSpacing: 2,
  },

  dateCard: {
    minHeight: 300,
  },

  cardContent: {
    flex: 1,
  },

  dateTitle: {
    marginBottom: spacing.md,
  },

  dateDescription: {
    marginBottom: spacing.lg,
    lineHeight: 24,
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.full,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    paddingVertical: spacing.xl,
  },

  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  likeButton: {
    backgroundColor: colors.lavender,
  },

  actionEmoji: {
    fontSize: 28,
  },
});

export default DateSwipeScreen;
