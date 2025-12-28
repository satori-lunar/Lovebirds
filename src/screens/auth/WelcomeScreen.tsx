import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { ScreenContainer, Button, Heading1, BodyText } from '../../components/ui';
import { colors, spacing } from '../../constants/theme';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <ScreenContainer centered withPadding>
      <View style={styles.content}>
        {/* Logo/Illustration Area */}
        <View style={styles.logoContainer}>
          <View style={styles.heartContainer}>
            <View style={styles.heartLeft} />
            <View style={styles.heartRight} />
          </View>
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Heading1 align="center" style={styles.title}>
            Lovebirds
          </Heading1>
          <BodyText color="secondary" align="center" style={styles.subtitle}>
            Get to know your partner better,{'\n'}one question at a time.
          </BodyText>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <BodyText color="secondary" align="center">
            Daily questions to deepen your connection
          </BodyText>
          <BodyText color="secondary" align="center">
            Plan dates together
          </BodyText>
          <BodyText color="secondary" align="center">
            Treasure your memories
          </BodyText>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('SignUp')}
            fullWidth
            size="lg"
          />
          <Button
            title="I already have an account"
            onPress={() => navigation.navigate('Login')}
            variant="ghost"
            fullWidth
            size="lg"
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  logoContainer: {
    marginBottom: spacing['2xl'],
  },

  heartContainer: {
    width: 100,
    height: 90,
    position: 'relative',
  },

  heartLeft: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: colors.accent,
    borderRadius: 30,
    left: 0,
    top: 10,
    transform: [{ rotate: '-45deg' }],
  },

  heartRight: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 30,
    right: 0,
    top: 10,
    transform: [{ rotate: '45deg' }],
  },

  textContainer: {
    marginBottom: spacing.xl,
  },

  title: {
    marginBottom: spacing.md,
    color: colors.primary,
  },

  subtitle: {
    lineHeight: 24,
  },

  features: {
    marginBottom: spacing['2xl'],
    gap: spacing.sm,
  },

  buttonContainer: {
    width: '100%',
    gap: spacing.md,
  },
});

export default WelcomeScreen;
