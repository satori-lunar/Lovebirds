import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Card,
  Button,
  Avatar,
  Heading1,
  Heading2,
  BodyText,
  Caption,
} from '../../components/ui';
import { useAuthStore, useRelationshipStore } from '../../stores';
import { colors, spacing, borderRadius } from '../../constants/theme';

const loveLanguageLabels: Record<string, string> = {
  words_of_affirmation: 'Words of Affirmation',
  acts_of_service: 'Acts of Service',
  receiving_gifts: 'Receiving Gifts',
  quality_time: 'Quality Time',
  physical_touch: 'Physical Touch',
};

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, onboarding, logout } = useAuthStore();
  const { partner, relationship } = useRelationshipStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Heading1>Profile</Heading1>
        </View>

        {/* User Info Card */}
        <Card variant="lavender" padding="lg" style={styles.userCard}>
          <View style={styles.userInfo}>
            <Avatar name={user?.name} size="xl" />
            <Heading2 style={styles.userName}>{user?.name}</Heading2>
            <Caption color="secondary">{user?.email}</Caption>
          </View>
        </Card>

        {/* Partner Info */}
        {partner ? (
          <Card variant="default" padding="md" style={styles.section}>
            <View style={styles.sectionHeader}>
              <BodyText style={styles.sectionEmoji}>💕</BodyText>
              <Heading2>Your Partner</Heading2>
            </View>
            <View style={styles.partnerInfo}>
              <Avatar name={partner.name} size="md" />
              <View style={styles.partnerText}>
                <BodyText weight="medium">{partner.name}</BodyText>
                <Caption color="muted">Connected</Caption>
              </View>
            </View>
          </Card>
        ) : (
          <Card variant="default" padding="md" style={styles.section}>
            <View style={styles.emptyPartner}>
              <BodyText style={styles.sectionEmoji}>💕</BodyText>
              <BodyText color="secondary">No partner connected yet</BodyText>
              <Button
                title="Invite Partner"
                onPress={() => navigation.navigate('PartnerInvite')}
                variant="outline"
                size="sm"
                style={styles.inviteButton}
              />
            </View>
          </Card>
        )}

        {/* Love Languages */}
        {onboarding?.loveLanguages && onboarding.loveLanguages.length > 0 && (
          <Card variant="default" padding="md" style={styles.section}>
            <View style={styles.sectionHeader}>
              <BodyText style={styles.sectionEmoji}>💗</BodyText>
              <Heading2>Your Love Languages</Heading2>
            </View>
            <View style={styles.tags}>
              {onboarding.loveLanguages.map((lang) => (
                <View key={lang} style={styles.tag}>
                  <Caption color="primary" weight="medium">
                    {loveLanguageLabels[lang] || lang}
                  </Caption>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* Preferences Summary */}
        <Card variant="default" padding="md" style={styles.section}>
          <View style={styles.sectionHeader}>
            <BodyText style={styles.sectionEmoji}>⚙️</BodyText>
            <Heading2>Your Preferences</Heading2>
          </View>
          <View style={styles.preferencesList}>
            <View style={styles.preferenceItem}>
              <Caption color="muted">Budget</Caption>
              <BodyText weight="medium" style={styles.preferenceValue}>
                {onboarding?.budgetComfort || 'Not set'}
              </BodyText>
            </View>
            <View style={styles.preferenceItem}>
              <Caption color="muted">Energy Level</Caption>
              <BodyText weight="medium" style={styles.preferenceValue}>
                {onboarding?.energyLevel || 'Not set'}
              </BodyText>
            </View>
            <View style={styles.preferenceItem}>
              <Caption color="muted">Likes</Caption>
              <BodyText weight="medium" style={styles.preferenceValue}>
                {onboarding?.likes?.length || 0} items
              </BodyText>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <BodyText color="primary">Edit Preferences</BodyText>
          </TouchableOpacity>
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('Settings')}
          >
            <Card variant="default" padding="md">
              <View style={styles.actionContent}>
                <BodyText style={styles.actionEmoji}>⚙️</BodyText>
                <BodyText weight="medium">Settings</BodyText>
                <BodyText color="muted" style={styles.actionArrow}>›</BodyText>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <Card variant="default" padding="md">
              <View style={styles.actionContent}>
                <BodyText style={styles.actionEmoji}>❓</BodyText>
                <BodyText weight="medium">Help & Support</BodyText>
                <BodyText color="muted" style={styles.actionArrow}>›</BodyText>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <Card variant="default" padding="md">
              <View style={styles.actionContent}>
                <BodyText style={styles.actionEmoji}>📜</BodyText>
                <BodyText weight="medium">Privacy Policy</BodyText>
                <BodyText color="muted" style={styles.actionArrow}>›</BodyText>
              </View>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="ghost"
          fullWidth
          style={styles.logoutButton}
        />

        <Caption color="muted" align="center" style={styles.version}>
          Lovebirds v1.0.0
        </Caption>
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

  userCard: {
    marginBottom: spacing.lg,
  },

  userInfo: {
    alignItems: 'center',
  },

  userName: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },

  section: {
    marginBottom: spacing.md,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  sectionEmoji: {
    fontSize: 20,
    marginRight: spacing.sm,
  },

  partnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  partnerText: {
    marginLeft: spacing.md,
  },

  emptyPartner: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },

  inviteButton: {
    marginTop: spacing.md,
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.lavender,
    borderRadius: borderRadius.full,
  },

  preferencesList: {
    gap: spacing.sm,
  },

  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },

  preferenceValue: {
    textTransform: 'capitalize',
  },

  editButton: {
    marginTop: spacing.md,
    alignItems: 'center',
  },

  actions: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },

  actionItem: {},

  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionEmoji: {
    fontSize: 20,
    marginRight: spacing.md,
  },

  actionArrow: {
    marginLeft: 'auto',
    fontSize: 24,
  },

  logoutButton: {
    marginTop: spacing.xl,
  },

  version: {
    marginTop: spacing.lg,
  },
});

export default ProfileScreen;
