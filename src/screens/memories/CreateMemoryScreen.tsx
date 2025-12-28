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
  BodyText,
  Caption,
} from '../../components/ui';
import { colors, spacing, borderRadius } from '../../constants/theme';

type CreateMemoryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateMemory'>;
};

const CreateMemoryScreen: React.FC<CreateMemoryScreenProps> = ({
  navigation,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <ScreenContainer scrollable withPadding keyboardAvoiding>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BodyText color="secondary">← Back</BodyText>
        </TouchableOpacity>

        <View style={styles.header}>
          <Heading1>Create Memory</Heading1>
          <BodyText color="secondary">
            Capture this moment to remember forever
          </BodyText>
        </View>

        {/* Photo Upload Area */}
        <TouchableOpacity style={styles.photoArea}>
          <Card variant="default" padding="lg" style={styles.photoCard}>
            <View style={styles.photoPlaceholder}>
              <BodyText style={styles.photoEmoji}>📷</BodyText>
              <BodyText color="secondary">Tap to add photos</BodyText>
              <Caption color="muted">Up to 10 photos per memory</Caption>
            </View>
          </Card>
        </TouchableOpacity>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Title (optional)"
            value={title}
            onChangeText={setTitle}
            placeholder="Give this memory a name..."
          />

          <Input
            label="What happened?"
            value={content}
            onChangeText={setContent}
            placeholder="Write about this moment..."
            multiline
            numberOfLines={6}
          />
        </View>

        {/* Privacy Toggle */}
        <Card variant="default" padding="md" style={styles.privacyCard}>
          <View style={styles.privacyContent}>
            <View style={styles.privacyText}>
              <BodyText weight="medium">Share with partner</BodyText>
              <Caption color="muted">
                Your partner will be able to see this memory
              </Caption>
            </View>
            <TouchableOpacity style={styles.toggle}>
              <View style={styles.toggleOn} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Save Button */}
        <View style={styles.footer}>
          <Button
            title="Save Memory"
            onPress={() => navigation.goBack()}
            fullWidth
            size="lg"
            disabled={!content.trim()}
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

  photoArea: {
    marginBottom: spacing.xl,
  },

  photoCard: {
    minHeight: 180,
  },

  photoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  photoEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },

  form: {
    marginBottom: spacing.lg,
  },

  privacyCard: {
    marginBottom: spacing.xl,
  },

  privacyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  privacyText: {
    flex: 1,
  },

  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  toggleOn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.card,
  },

  footer: {
    marginTop: 'auto',
  },
});

export default CreateMemoryScreen;
