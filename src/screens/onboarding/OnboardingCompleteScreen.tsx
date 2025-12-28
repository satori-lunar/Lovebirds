import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Button,
  Heading1,
  BodyText,
} from '../../components/ui';
import { useAuthStore } from '../../stores';
import { colors, spacing } from '../../constants/theme';

type OnboardingCompleteScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingComplete'>;
};

const OnboardingCompleteScreen: React.FC<OnboardingCompleteScreenProps> = ({
  navigation,
}) => {
  const { completeOnboarding } = useAuthStore();
  const scaleAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

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

  const handleStart = () => {
    completeOnboarding();
    // Navigation will happen automatically due to onboarding state change
  };

  return (
    <ScreenContainer centered withPadding>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.celebration,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.heartContainer}>
            <View style={styles.heartLeft} />
            <View style={styles.heartRight} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Heading1 align="center" style={styles.title}>
            You're all set!
          </Heading1>

          <BodyText color="secondary" align="center" style={styles.subtitle}>
            Your personalized Lovebirds experience is ready.
          </BodyText>

          <View style={styles.features}>
            <View style={styles.featureItem}>
              <BodyText style={styles.featureEmoji}>💬</BodyText>
              <BodyText color="secondary">
                Daily questions to know each other better
              </BodyText>
            </View>
            <View style={styles.featureItem}>
              <BodyText style={styles.featureEmoji}>💕</BodyText>
              <BodyText color="secondary">
                Personalized date suggestions just for you
              </BodyText>
            </View>
            <View style={styles.featureItem}>
              <BodyText style={styles.featureEmoji}>📸</BodyText>
              <BodyText color="secondary">
                Capture and treasure your memories together
              </BodyText>
            </View>
          </View>

          <Button
            title="Start Your Journey"
            onPress={handleStart}
            fullWidth
            size="lg"
            style={styles.button}
          />
        </Animated.View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  celebration: {
    marginBottom: spacing['2xl'],
  },

  heartContainer: {
    width: 120,
    height: 110,
    position: 'relative',
  },

  heartLeft: {
    position: 'absolute',
    width: 70,
    height: 70,
    backgroundColor: colors.accent,
    borderRadius: 35,
    left: 0,
    top: 15,
    transform: [{ rotate: '-45deg' }],
  },

  heartRight: {
    position: 'absolute',
    width: 70,
    height: 70,
    backgroundColor: colors.primary,
    borderRadius: 35,
    right: 0,
    top: 15,
    transform: [{ rotate: '45deg' }],
  },

  content: {
    width: '100%',
    alignItems: 'center',
  },

  title: {
    marginBottom: spacing.md,
    color: colors.primary,
  },

  subtitle: {
    marginBottom: spacing.xl,
  },

  features: {
    width: '100%',
    gap: spacing.lg,
    marginBottom: spacing['2xl'],
    paddingHorizontal: spacing.lg,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  featureEmoji: {
    fontSize: 24,
    marginRight: spacing.md,
  },

  button: {
    marginTop: spacing.lg,
  },
});

export default OnboardingCompleteScreen;
