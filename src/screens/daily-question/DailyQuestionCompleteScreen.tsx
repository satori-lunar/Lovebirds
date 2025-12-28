import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Button,
  Heading1,
  BodyText,
  Caption,
} from '../../components/ui';
import { colors, spacing } from '../../constants/theme';

type DailyQuestionCompleteScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DailyQuestionComplete'>;
};

const DailyQuestionCompleteScreen: React.FC<DailyQuestionCompleteScreenProps> = ({
  navigation,
}) => {
  return (
    <ScreenContainer centered withPadding>
      <View style={styles.container}>
        <View style={styles.content}>
          <BodyText style={styles.emoji}>✨</BodyText>
          <Heading1 align="center" style={styles.title}>
            That's it for today
          </Heading1>
          <BodyText color="secondary" align="center" style={styles.subtitle}>
            Great job connecting with your partner!
          </BodyText>
          <Caption color="muted" align="center" style={styles.hint}>
            Come back tomorrow for a new question.
          </Caption>
        </View>

        <View style={styles.footer}>
          <Button
            title="Back to Home"
            onPress={() => navigation.navigate('MainTabs')}
            fullWidth
            size="lg"
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

  content: {
    alignItems: 'center',
  },

  emoji: {
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
    marginTop: spacing.lg,
  },

  footer: {
    position: 'absolute',
    bottom: spacing.xl,
    left: 0,
    right: 0,
  },
});

export default DailyQuestionCompleteScreen;
