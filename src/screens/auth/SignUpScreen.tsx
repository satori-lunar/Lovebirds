import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Button,
  Input,
  Heading1,
  BodyText,
} from '../../components/ui';
import { useAuthStore } from '../../stores';
import { colors, spacing } from '../../constants/theme';

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { signUp, isLoading } = useAuthStore();

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setError('');
      await signUp(email, password, name);
      navigation.navigate('PartnerInvite');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <ScreenContainer scrollable withPadding keyboardAvoiding>
      <View style={styles.container}>
        <View style={styles.header}>
          <Heading1>Create Account</Heading1>
          <BodyText color="secondary" style={styles.subtitle}>
            Join Lovebirds and connect with your partner
          </BodyText>
        </View>

        <View style={styles.form}>
          <Input
            label="Your Name"
            value={name}
            onChangeText={setName}
            placeholder="What should we call you?"
            autoCapitalize="words"
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
          />

          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            title="Create Account"
            onPress={handleSignUp}
            fullWidth
            size="lg"
            loading={isLoading}
            style={styles.button}
          />

          <BodyText
            color="muted"
            align="center"
            style={styles.terms}
          >
            By signing up, you agree to our Terms of Service and Privacy Policy
          </BodyText>
        </View>

        <View style={styles.footer}>
          <BodyText color="secondary">Already have an account? </BodyText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing['3xl'],
  },

  header: {
    marginBottom: spacing.xl,
  },

  subtitle: {
    marginTop: spacing.sm,
  },

  form: {
    marginTop: spacing.lg,
  },

  error: {
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: 'center',
  },

  button: {
    marginTop: spacing.md,
  },

  terms: {
    marginTop: spacing.lg,
    fontSize: 12,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing['2xl'],
  },

  link: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default SignUpScreen;
