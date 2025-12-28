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

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }

    try {
      setError('');
      await login(email, password);
      // Navigation will happen automatically due to auth state change
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <ScreenContainer scrollable withPadding keyboardAvoiding>
      <View style={styles.container}>
        <View style={styles.header}>
          <Heading1>Welcome back</Heading1>
          <BodyText color="secondary" style={styles.subtitle}>
            Sign in to continue to Lovebirds
          </BodyText>
        </View>

        <View style={styles.form}>
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
            placeholder="Enter your password"
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            title="Sign In"
            onPress={handleLogin}
            fullWidth
            size="lg"
            loading={isLoading}
            style={styles.button}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <BodyText color="primary" align="center">
              Forgot your password?
            </BodyText>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <BodyText color="secondary">Don't have an account? </BodyText>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>Sign up</Text>
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

  forgotPassword: {
    marginTop: spacing.lg,
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

export default LoginScreen;
