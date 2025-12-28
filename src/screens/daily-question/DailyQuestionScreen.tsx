import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Card,
  Button,
  Heading1,
  BodyText,
} from '../../components/ui';
import { useDailyQuestionStore } from '../../stores';
import { colors, spacing } from '../../constants/theme';

type DailyQuestionScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DailyQuestion'>;
};

const DailyQuestionScreen: React.FC<DailyQuestionScreenProps> = ({
  navigation,
}) => {
  const { currentQuestion, userState } = useDailyQuestionStore();

  const handleStart = () => {
    navigation.navigate('DailyQuestionAnswer');
  };

  return (
    <ScreenContainer centered withPadding>
      <View style={styles.container}>
        <Card variant="lavender" padding="lg" style={styles.card}>
          <View style={styles.content}>
            <BodyText style={styles.emoji}>💬</BodyText>
            <Heading1 align="center" style={styles.title}>
              Today's Question
            </Heading1>
            <BodyText color="secondary" align="center" style={styles.description}>
              Answer today's question, then guess how your partner answered.
            </BodyText>

            <Button
              title="Let's Start"
              onPress={handleStart}
              fullWidth
              size="lg"
              style={styles.button}
            />
          </View>
        </Card>

        <BodyText color="muted" align="center" style={styles.privacy}>
          Your answers are private and won't be shared without permission.
        </BodyText>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  card: {
    marginBottom: spacing.lg,
  },

  content: {
    alignItems: 'center',
  },

  emoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },

  title: {
    marginBottom: spacing.md,
  },

  description: {
    marginBottom: spacing.xl,
  },

  button: {
    marginTop: spacing.md,
  },

  privacy: {
    fontSize: 12,
  },
});

export default DailyQuestionScreen;
