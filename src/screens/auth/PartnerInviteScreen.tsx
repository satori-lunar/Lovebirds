import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Button,
  Input,
  Card,
  Heading1,
  Heading2,
  BodyText,
} from '../../components/ui';
import { useRelationshipStore } from '../../stores';
import { colors, spacing, borderRadius } from '../../constants/theme';

type PartnerInviteScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PartnerInvite'>;
};

const PartnerInviteScreen: React.FC<PartnerInviteScreenProps> = ({ navigation }) => {
  const [mode, setMode] = useState<'generate' | 'enter'>('generate');
  const [partnerCode, setPartnerCode] = useState('');
  const [error, setError] = useState('');

  const { inviteCode, generateInviteCode, joinWithCode, isLoading } = useRelationshipStore();

  useEffect(() => {
    if (!inviteCode) {
      generateInviteCode();
    }
  }, []);

  const handleShareCode = async () => {
    if (!inviteCode) return;

    try {
      await Share.share({
        message: `Join me on Lovebirds! Use my invite code: ${inviteCode}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleJoinWithCode = async () => {
    if (!partnerCode || partnerCode.length !== 6) {
      setError('Please enter a valid 6-character code');
      return;
    }

    try {
      setError('');
      await joinWithCode(partnerCode.toUpperCase());
      // Navigation will happen automatically
    } catch (err) {
      setError('Invalid code. Please check and try again.');
    }
  };

  const handleSkipForNow = () => {
    Alert.alert(
      'Skip Partner Linking?',
      'You can always invite your partner later from settings. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () => {
            // Navigate to onboarding
            navigation.navigate('OnboardingLoveLanguage');
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        <View style={styles.header}>
          <Heading1>Connect with your partner</Heading1>
          <BodyText color="secondary" style={styles.subtitle}>
            Lovebirds works best when you're both on board.
          </BodyText>
        </View>

        {/* Mode Selector */}
        <View style={styles.modeSelector}>
          <TouchableOpacity
            style={[styles.modeTab, mode === 'generate' && styles.modeTabActive]}
            onPress={() => setMode('generate')}
          >
            <BodyText
              color={mode === 'generate' ? 'inverse' : 'secondary'}
              weight="medium"
            >
              Share Code
            </BodyText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeTab, mode === 'enter' && styles.modeTabActive]}
            onPress={() => setMode('enter')}
          >
            <BodyText
              color={mode === 'enter' ? 'inverse' : 'secondary'}
              weight="medium"
            >
              Enter Code
            </BodyText>
          </TouchableOpacity>
        </View>

        {mode === 'generate' ? (
          /* Share Code View */
          <View style={styles.content}>
            <Card variant="lavender" padding="lg" style={styles.codeCard}>
              <BodyText color="secondary" align="center">
                Your invite code
              </BodyText>
              <Heading1 align="center" style={styles.codeText}>
                {inviteCode || '------'}
              </Heading1>
              <BodyText color="muted" align="center" style={styles.codeHint}>
                Share this code with your partner
              </BodyText>
            </Card>

            <Button
              title="Share Code"
              onPress={handleShareCode}
              fullWidth
              size="lg"
              style={styles.button}
            />

            <BodyText color="muted" align="center" style={styles.orText}>
              or
            </BodyText>

            <Button
              title="Copy Code"
              onPress={() => {
                // In a real app, use Clipboard API
                Alert.alert('Copied!', 'Code copied to clipboard');
              }}
              variant="outline"
              fullWidth
              size="lg"
            />
          </View>
        ) : (
          /* Enter Code View */
          <View style={styles.content}>
            <BodyText color="secondary" style={styles.enterCodeHint}>
              Enter the 6-character code your partner shared with you
            </BodyText>

            <Input
              value={partnerCode}
              onChangeText={(text) => setPartnerCode(text.toUpperCase())}
              placeholder="XXXXXX"
              maxLength={6}
              autoCapitalize="characters"
              style={styles.codeInput}
              inputStyle={styles.codeInputText}
            />

            {error ? (
              <BodyText color="error" align="center" style={styles.error}>
                {error}
              </BodyText>
            ) : null}

            <Button
              title="Connect"
              onPress={handleJoinWithCode}
              fullWidth
              size="lg"
              loading={isLoading}
              disabled={partnerCode.length !== 6}
              style={styles.button}
            />
          </View>
        )}

        <TouchableOpacity onPress={handleSkipForNow} style={styles.skipButton}>
          <BodyText color="muted" align="center">
            Skip for now
          </BodyText>
        </TouchableOpacity>
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

  modeSelector: {
    flexDirection: 'row',
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    marginBottom: spacing.xl,
  },

  modeTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },

  modeTabActive: {
    backgroundColor: colors.primary,
  },

  content: {
    marginTop: spacing.lg,
  },

  codeCard: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  codeText: {
    marginVertical: spacing.md,
    letterSpacing: 8,
    color: colors.primary,
  },

  codeHint: {
    fontSize: 12,
  },

  button: {
    marginTop: spacing.md,
  },

  orText: {
    marginVertical: spacing.lg,
  },

  enterCodeHint: {
    marginBottom: spacing.lg,
  },

  codeInput: {
    marginBottom: spacing.md,
  },

  codeInputText: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 8,
    fontWeight: '600',
  },

  error: {
    marginBottom: spacing.md,
  },

  skipButton: {
    marginTop: spacing['2xl'],
    paddingVertical: spacing.md,
  },
});

export default PartnerInviteScreen;
