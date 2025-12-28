import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Button, Heading1, BodyText, Caption } from '../../components/ui';
import { colors, spacing, borderRadius } from '../../constants/theme';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const AnimatedHeart: React.FC<{ delay: number; color: string; style?: any }> = ({ delay, color, style }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.15,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();
    return () => pulseAnimation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.heartWrapper,
        style,
        { transform: [{ scale }] },
      ]}
    >
      <View style={[styles.heartCircle, { backgroundColor: color }]} />
    </Animated.View>
  );
};

const FeatureCard: React.FC<{ emoji: string; title: string; description: string; isPink?: boolean }> = ({
  emoji,
  title,
  description,
  isPink = true,
}) => (
  <View style={[styles.featureCard, isPink ? styles.featureCardPink : styles.featureCardPurple]}>
    <BodyText style={styles.featureEmoji}>{emoji}</BodyText>
    <BodyText style={[styles.featureTitle, isPink ? styles.textPink : styles.textPurple]}>
      {title}
    </BodyText>
    <Caption color="secondary" style={styles.featureDescription}>
      {description}
    </Caption>
  </View>
);

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#FDF2F8', '#FAF5FF', '#F3E8FF']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Animated Hearts */}
        <View style={styles.heartsContainer}>
          <AnimatedHeart delay={0} color={colors.pink[400]} style={styles.heartOne} />
          <AnimatedHeart delay={600} color={colors.purple[400]} style={styles.heartTwo} />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Heading1 align="center" style={styles.title}>
            Love Birds
          </Heading1>
          <BodyText color="secondary" align="center" style={styles.subtitle}>
            Strengthen your relationship through{'\n'}daily interactions and meaningful moments
          </BodyText>
        </View>

        {/* Feature Grid */}
        <View style={styles.featuresGrid}>
          <FeatureCard
            emoji="💬"
            title="Daily Questions"
            description="Deepen your connection"
            isPink={true}
          />
          <FeatureCard
            emoji="💜"
            title="Tailored Dates"
            description="Perfect date ideas"
            isPink={false}
          />
          <FeatureCard
            emoji="🎁"
            title="Gift Guidance"
            description="Thoughtful suggestions"
            isPink={true}
          />
          <FeatureCard
            emoji="📅"
            title="Never Forget"
            description="Important dates tracked"
            isPink={false}
          />
        </View>

        {/* CTA Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Start Your 7-Day Free Trial"
            onPress={() => navigation.navigate('SignUp')}
            variant="gradient"
            fullWidth
            size="lg"
          />
          <Caption color="secondary" align="center" style={styles.disclaimer}>
            No credit card required • Cancel anytime
          </Caption>
          <Button
            title="I already have an account"
            onPress={() => navigation.navigate('Login')}
            variant="ghost"
            fullWidth
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.xl,
  },

  // Hearts
  heartsContainer: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    flexDirection: 'row',
  },
  heartWrapper: {
    marginHorizontal: -8,
  },
  heartOne: {
    zIndex: 1,
  },
  heartTwo: {
    marginTop: 10,
  },
  heartCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  // Title
  titleContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 32,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  subtitle: {
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },

  // Features
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  featureCard: {
    width: '48%',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.sm,
  },
  featureCardPink: {
    backgroundColor: colors.pink[50],
  },
  featureCardPurple: {
    backgroundColor: colors.purple[50],
  },
  featureEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  featureTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 12,
  },
  textPink: {
    color: colors.pink[600],
  },
  textPurple: {
    color: colors.purple[600],
  },

  // Buttons
  buttonContainer: {
    marginTop: 'auto',
    gap: spacing.sm,
  },
  disclaimer: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
});

export default WelcomeScreen;
