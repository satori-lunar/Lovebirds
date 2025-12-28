import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Heading1,
  BodyText,
  Caption,
  Button,
} from '../../components/ui';
import { useAuthStore, useDailyQuestionStore } from '../../stores';
import { colors, spacing } from '../../constants/theme';

type DailyQuestionWaitingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DailyQuestionWaiting'>;
};

const DailyQuestionWaitingScreen: React.FC<DailyQuestionWaitingScreenProps> = ({
  navigation,
}) => {
  const { user } = useAuthStore();
  const { hasPartnerAnswered } = useDailyQuestionStore();

  // Animation values
  const heart1Anim = useRef(new Animated.Value(0)).current;
  const heart2Anim = useRef(new Animated.Value(0)).current;
  const heart3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating hearts animation
    const createFloatAnimation = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = createFloatAnimation(heart1Anim, 0);
    const anim2 = createFloatAnimation(heart2Anim, 700);
    const anim3 = createFloatAnimation(heart3Anim, 1400);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  // Check periodically if partner has answered
  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (user && hasPartnerAnswered(user.id)) {
        navigation.replace('DailyQuestionGuess');
      }
    }, 3000);

    return () => clearInterval(checkInterval);
  }, [user]);

  const createHeartStyle = (anim: Animated.Value, startX: number) => ({
    opacity: anim.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: [0, 1, 1, 0],
    }),
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100],
        }),
      },
      {
        translateX: anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, startX, startX * 1.5],
        }),
      },
      {
        scale: anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.5, 1, 0.8],
        }),
      },
    ],
  });

  return (
    <ScreenContainer centered withPadding>
      <View style={styles.container}>
        {/* Floating Hearts Animation */}
        <View style={styles.heartsContainer}>
          <Animated.View
            style={[styles.floatingHeart, createHeartStyle(heart1Anim, -20)]}
          >
            <BodyText style={styles.heartEmoji}>💕</BodyText>
          </Animated.View>
          <Animated.View
            style={[styles.floatingHeart, createHeartStyle(heart2Anim, 30)]}
          >
            <BodyText style={styles.heartEmoji}>💗</BodyText>
          </Animated.View>
          <Animated.View
            style={[styles.floatingHeart, createHeartStyle(heart3Anim, -10)]}
          >
            <BodyText style={styles.heartEmoji}>💓</BodyText>
          </Animated.View>
        </View>

        <View style={styles.content}>
          <BodyText style={styles.mainEmoji}>⏳</BodyText>
          <Heading1 align="center" style={styles.title}>
            Waiting for your partner
          </Heading1>
          <BodyText color="secondary" align="center" style={styles.subtitle}>
            Your partner is answering today's question.
          </BodyText>
          <Caption color="muted" align="center" style={styles.hint}>
            We'll notify you when they're done!
          </Caption>
        </View>

        <View style={styles.footer}>
          <Button
            title="Done for now"
            onPress={() => navigation.navigate('MainTabs')}
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
    width: '100%',
    justifyContent: 'center',
  },

  heartsContainer: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    alignItems: 'center',
    height: 150,
  },

  floatingHeart: {
    position: 'absolute',
    bottom: 0,
  },

  heartEmoji: {
    fontSize: 24,
  },

  content: {
    alignItems: 'center',
  },

  mainEmoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },

  title: {
    marginBottom: spacing.md,
  },

  subtitle: {
    marginBottom: spacing.sm,
  },

  hint: {
    marginTop: spacing.md,
  },

  footer: {
    position: 'absolute',
    bottom: spacing.xl,
    left: 0,
    right: 0,
  },
});

export default DailyQuestionWaitingScreen;
