import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Card,
  Button,
  Input,
  Heading1,
  Heading2,
  BodyText,
  Caption,
} from '../../components/ui';
import { useAuthStore, useRelationshipStore, useDailyQuestionStore } from '../../stores';
import { colors, spacing } from '../../constants/theme';

type DailyQuestionGuessScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DailyQuestionGuess'>;
};

const DailyQuestionGuessScreen: React.FC<DailyQuestionGuessScreenProps> = ({
  navigation,
}) => {
  const [guess, setGuess] = useState('');
  const { user } = useAuthStore();
  const { partner } = useRelationshipStore();
  const { currentQuestion, submitGuess, getPartnerAnswer } = useDailyQuestionStore();

  const partnerName = partner?.name || 'your partner';

  // Format question to ask about partner
  const formatQuestionForPartner = () => {
    const questionText = currentQuestion?.text || 'What is their favorite movie?';
    // Simple replacement of "your" with partner's name
    return questionText
      .replace(/your /gi, `${partnerName}'s `)
      .replace(/you /gi, `${partnerName} `);
  };

  const handleSubmit = () => {
    if (!guess.trim() || !user) return;

    const partnerAnswer = getPartnerAnswer(user.id);
    const isCorrect = submitGuess(user.id, guess.trim(), partnerAnswer || '');

    navigation.replace('DailyQuestionResult', {
      isCorrect,
      correctAnswer: partnerAnswer || '',
    });
  };

  return (
    <ScreenContainer scrollable withPadding keyboardAvoiding>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Caption color="muted" align="center" style={styles.step}>
            STEP 2 OF 2
          </Caption>
          <Heading1 align="center">
            Let's see how well you know {partnerName}
          </Heading1>
        </View>

        {/* Question Card */}
        <Card variant="lavender" padding="lg" style={styles.questionCard}>
          <Heading2 align="center" style={styles.questionText}>
            {formatQuestionForPartner()}
          </Heading2>
        </Card>

        {/* Guess Input */}
        <View style={styles.inputSection}>
          <Input
            value={guess}
            onChangeText={setGuess}
            placeholder="Type your guess..."
            multiline
            numberOfLines={4}
            style={styles.input}
          />
        </View>

        {/* Submit Button */}
        <View style={styles.footer}>
          <Button
            title="Submit Guess"
            onPress={handleSubmit}
            fullWidth
            size="lg"
            disabled={!guess.trim()}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },

  header: {
    marginBottom: spacing.xl,
  },

  step: {
    marginBottom: spacing.sm,
    letterSpacing: 1,
  },

  questionCard: {
    marginBottom: spacing.xl,
  },

  questionText: {
    lineHeight: 32,
  },

  inputSection: {
    marginBottom: spacing.xl,
  },

  input: {
    marginBottom: spacing.sm,
  },

  footer: {
    marginTop: 'auto',
  },
});

export default DailyQuestionGuessScreen;
