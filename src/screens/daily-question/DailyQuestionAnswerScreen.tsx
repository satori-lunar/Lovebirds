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
import { useAuthStore, useDailyQuestionStore } from '../../stores';
import { colors, spacing } from '../../constants/theme';

type DailyQuestionAnswerScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DailyQuestionAnswer'>;
};

const DailyQuestionAnswerScreen: React.FC<DailyQuestionAnswerScreenProps> = ({
  navigation,
}) => {
  const [answer, setAnswer] = useState('');
  const { user } = useAuthStore();
  const { currentQuestion, submitAnswer, hasPartnerAnswered } = useDailyQuestionStore();

  const handleSubmit = () => {
    if (!answer.trim() || !user) return;

    submitAnswer(user.id, answer.trim());

    // Check if partner has answered to determine next screen
    const partnerAnswered = hasPartnerAnswered(user.id);

    if (partnerAnswered) {
      navigation.replace('DailyQuestionGuess');
    } else {
      navigation.replace('DailyQuestionWaiting');
    }
  };

  return (
    <ScreenContainer scrollable withPadding keyboardAvoiding>
      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BodyText color="secondary">← Back</BodyText>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Caption color="muted" align="center" style={styles.step}>
            STEP 1 OF 2
          </Caption>
          <Heading1 align="center">Tell us about you</Heading1>
        </View>

        {/* Question Card */}
        <Card variant="lavender" padding="lg" style={styles.questionCard}>
          <Heading2 align="center" style={styles.questionText}>
            {currentQuestion?.text || 'What is your favorite movie?'}
          </Heading2>
        </Card>

        {/* Answer Input */}
        <View style={styles.inputSection}>
          <Input
            value={answer}
            onChangeText={setAnswer}
            placeholder="Type your answer..."
            multiline
            numberOfLines={4}
            style={styles.input}
          />
          <Caption color="muted" style={styles.privacy}>
            Your answer is private.
          </Caption>
        </View>

        {/* Submit Button */}
        <View style={styles.footer}>
          <Button
            title="Submit"
            onPress={handleSubmit}
            fullWidth
            size="lg"
            disabled={!answer.trim()}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
    paddingVertical: spacing.sm,
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

  privacy: {
    textAlign: 'center',
  },

  footer: {
    marginTop: 'auto',
  },
});

export default DailyQuestionAnswerScreen;
