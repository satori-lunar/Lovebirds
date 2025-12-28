import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Card,
  Button,
  Heading1,
  Heading2,
  BodyText,
  Caption,
} from '../../components/ui';
import { colors, spacing, borderRadius } from '../../constants/theme';

const MemoriesScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Heading1>Memories</Heading1>
          <BodyText color="secondary">
            Capture and treasure your moments together
          </BodyText>
        </View>

        {/* Premium Feature Banner */}
        <Card variant="lavender" padding="lg" style={styles.premiumBanner}>
          <View style={styles.premiumContent}>
            <BodyText style={styles.premiumEmoji}>✨</BodyText>
            <Heading2 align="center" style={styles.premiumTitle}>
              Premium Feature
            </Heading2>
            <BodyText color="secondary" align="center" style={styles.premiumDescription}>
              Unlock unlimited photo uploads, journal entries, and a beautiful
              timeline of your relationship.
            </BodyText>
            <Button
              title="Upgrade to Premium"
              onPress={() => {}}
              fullWidth
              style={styles.premiumButton}
            />
          </View>
        </Card>

        {/* Feature Preview */}
        <View style={styles.features}>
          <Heading2 style={styles.featuresTitle}>What you'll get</Heading2>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <BodyText>📸</BodyText>
              </View>
              <View style={styles.featureText}>
                <BodyText weight="medium">Unlimited Photos</BodyText>
                <Caption color="muted">
                  Upload and organize all your favorite moments
                </Caption>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <BodyText>📝</BodyText>
              </View>
              <View style={styles.featureText}>
                <BodyText weight="medium">Journal Entries</BodyText>
                <Caption color="muted">
                  Write about your dates and special moments
                </Caption>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <BodyText>🏷️</BodyText>
              </View>
              <View style={styles.featureText}>
                <BodyText weight="medium">Tags & Organization</BodyText>
                <Caption color="muted">
                  Categorize by date type, location, or event
                </Caption>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <BodyText>🔒</BodyText>
              </View>
              <View style={styles.featureText}>
                <BodyText weight="medium">Private & Shared</BodyText>
                <Caption color="muted">
                  Control what's private vs shared with your partner
                </Caption>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <BodyText>📅</BodyText>
              </View>
              <View style={styles.featureText}>
                <BodyText weight="medium">Timeline View</BodyText>
                <Caption color="muted">
                  See your relationship journey beautifully displayed
                </Caption>
              </View>
            </View>
          </View>
        </View>

        {/* Sample Preview */}
        <Card variant="default" padding="md" style={styles.preview}>
          <View style={styles.previewHeader}>
            <Heading2>Preview</Heading2>
            <Caption color="muted">What your timeline could look like</Caption>
          </View>

          <View style={styles.previewTimeline}>
            <View style={styles.previewItem}>
              <View style={styles.previewDate}>
                <Caption color="muted">Dec 25</Caption>
              </View>
              <View style={styles.previewCard}>
                <View style={styles.previewImagePlaceholder}>
                  <BodyText>🎄</BodyText>
                </View>
                <Caption color="secondary">Christmas together</Caption>
              </View>
            </View>

            <View style={styles.previewItem}>
              <View style={styles.previewDate}>
                <Caption color="muted">Nov 15</Caption>
              </View>
              <View style={styles.previewCard}>
                <View style={styles.previewImagePlaceholder}>
                  <BodyText>🍽️</BodyText>
                </View>
                <Caption color="secondary">Anniversary dinner</Caption>
              </View>
            </View>

            <View style={styles.previewItem}>
              <View style={styles.previewDate}>
                <Caption color="muted">Oct 31</Caption>
              </View>
              <View style={styles.previewCard}>
                <View style={styles.previewImagePlaceholder}>
                  <BodyText>🎃</BodyText>
                </View>
                <Caption color="secondary">Halloween costumes</Caption>
              </View>
            </View>
          </View>
        </Card>
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

  premiumBanner: {
    marginBottom: spacing.xl,
  },

  premiumContent: {
    alignItems: 'center',
  },

  premiumEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },

  premiumTitle: {
    marginBottom: spacing.sm,
  },

  premiumDescription: {
    marginBottom: spacing.lg,
    lineHeight: 22,
  },

  premiumButton: {
    marginTop: spacing.sm,
  },

  features: {
    marginBottom: spacing.xl,
  },

  featuresTitle: {
    marginBottom: spacing.lg,
  },

  featureList: {
    gap: spacing.md,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  featureText: {
    flex: 1,
    paddingTop: spacing.xs,
  },

  preview: {
    marginBottom: spacing.xl,
  },

  previewHeader: {
    marginBottom: spacing.lg,
  },

  previewTimeline: {
    gap: spacing.md,
  },

  previewItem: {
    flexDirection: 'row',
  },

  previewDate: {
    width: 60,
    paddingTop: spacing.sm,
  },

  previewCard: {
    flex: 1,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },

  previewImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
});

export default MemoriesScreen;
