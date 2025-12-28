import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Card,
  Button,
  Heading1,
  Heading2,
  BodyText,
  Caption,
} from '../../components/ui';
import { colors, spacing } from '../../constants/theme';

type DailyQuestionResultScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DailyQuestionResult'>;
  route: RouteProp<RootStackParamList, 'DailyQuestionResult'>;
};

const DailyQuestionResultScreen: React.FC<DailyQuestionResultScreenProps> = ({
  navigation,
  route,
}) => {
  const { isCorrect, correctAnswer } = route.params;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDone = () => {
    navigation.navigate('DailyQuestionComplete');
  };

  return (
    <ScreenContainer centered withPadding>
      <View style={styles.container}>
        {/* Celebration / Result */}
        <Animated.View
          style={[
            styles.emojiContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <BodyText style={styles.emoji}>
            {isCorrect ? '🎉' : '💛'}
          </BodyText>
        </Animated.View>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {isCorrect ? (
            /* Correct Guess */
            <>
              <Heading1 align="center" style={styles.title}>
                You got it right!
              </Heading1>
              <Card variant="lavender" padding="lg" style={styles.answerCard}>
                <Caption color="muted" align="center" style={styles.answerLabel}>
                  Their answer was
                </Caption>
                <Heading2 align="center" style={styles.answerText}>
                  {correctAnswer}
                </Heading2>
              </Card>
            </>
          ) : (
            /* Incorrect Guess - PRIVATE */
            <>
              <Heading1 align="center" style={styles.title}>
                Not quite — now you know
              </Heading1>
              <Card variant="peach" padding="lg" style={styles.answerCard}>
                <Caption color="muted" align="center" style={styles.answerLabel}>
                  Their answer was
                </Caption>
                <Heading2 align="center" style={styles.answerText}>
                  {correctAnswer}
                </Heading2>
              </Card>
              <Caption color="muted" align="center" style={styles.privacyNote}>
                They won't see your guess.
              </Caption>
            </>
          )}
        </Animated.View>

        <View style={styles.footer}>
          <Button
            title="Done for today"
            onPress={handleDone}
            fullWidth
            size="lg"
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },

  emojiContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  emoji: {
    fontSize: 72,
  },

  content: {
    alignItems: 'center',
  },

  title: {
    marginBottom: spacing.xl,
  },

  answerCard: {
    width: '100%',
    marginBottom: spacing.md,
  },

  answerLabel: {
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },

  answerText: {
    lineHeight: 30,
  },

  privacyNote: {
    marginTop: spacing.md,
    fontStyle: 'italic',
  },

  footer: {
    position: 'absolute',
    bottom: spacing.xl,
    left: 0,
    right: 0,
  },
});

export default DailyQuestionResultScreen;
