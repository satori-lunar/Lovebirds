import React from 'react';
import { View, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Card,
  Heading1,
  Heading2,
  BodyText,
  Caption,
} from '../../components/ui';
import { useAuthStore, useRelationshipStore } from '../../stores';
import { colors, spacing, borderRadius } from '../../constants/theme';

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuthStore();
  const { relationship, updateRelationshipStatus } = useRelationshipStore();

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [dailyReminders, setDailyReminders] = React.useState(true);

  const handlePauseRelationship = () => {
    Alert.alert(
      'Pause Relationship',
      'This will pause daily questions and notifications. You can resume anytime.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pause',
          onPress: () => updateRelationshipStatus('paused'),
          style: 'destructive',
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action is permanent and cannot be undone. All your data will be deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            logout();
            navigation.navigate('Welcome');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BodyText color="secondary">← Back</BodyText>
        </TouchableOpacity>

        <View style={styles.header}>
          <Heading1>Settings</Heading1>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Notifications</Heading2>

          <Card variant="default" padding="md" style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingText}>
                <BodyText weight="medium">Push Notifications</BodyText>
                <Caption color="muted">
                  Get notified about daily questions and more
                </Caption>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
          </Card>

          <Card variant="default" padding="md" style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingText}>
                <BodyText weight="medium">Daily Question Reminders</BodyText>
                <Caption color="muted">
                  Remind me to answer if I haven't yet
                </Caption>
              </View>
              <Switch
                value={dailyReminders}
                onValueChange={setDailyReminders}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
          </Card>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Privacy</Heading2>

          <TouchableOpacity>
            <Card variant="default" padding="md" style={styles.settingCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingText}>
                  <BodyText weight="medium">Data & Privacy</BodyText>
                  <Caption color="muted">
                    Manage your data and privacy settings
                  </Caption>
                </View>
                <BodyText color="muted" style={styles.arrow}>›</BodyText>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity>
            <Card variant="default" padding="md" style={styles.settingCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingText}>
                  <BodyText weight="medium">Export My Data</BodyText>
                  <Caption color="muted">
                    Download a copy of your data
                  </Caption>
                </View>
                <BodyText color="muted" style={styles.arrow}>›</BodyText>
              </View>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Relationship Section */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Relationship</Heading2>

          <TouchableOpacity onPress={handlePauseRelationship}>
            <Card variant="default" padding="md" style={styles.settingCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingText}>
                  <BodyText weight="medium" color="secondary">
                    Pause Relationship
                  </BodyText>
                  <Caption color="muted">
                    Take a break from daily questions
                  </Caption>
                </View>
                <BodyText color="muted" style={styles.arrow}>›</BodyText>
              </View>
            </Card>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle}>About</Heading2>

          <TouchableOpacity>
            <Card variant="default" padding="md" style={styles.settingCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingText}>
                  <BodyText weight="medium">Terms of Service</BodyText>
                </View>
                <BodyText color="muted" style={styles.arrow}>›</BodyText>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity>
            <Card variant="default" padding="md" style={styles.settingCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingText}>
                  <BodyText weight="medium">Privacy Policy</BodyText>
                </View>
                <BodyText color="muted" style={styles.arrow}>›</BodyText>
              </View>
            </Card>
          </TouchableOpacity>

          <Card variant="default" padding="md" style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingText}>
                <BodyText weight="medium">Version</BodyText>
              </View>
              <Caption color="muted">1.0.0</Caption>
            </View>
          </Card>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle} color="error">
            Danger Zone
          </Heading2>

          <TouchableOpacity onPress={handleDeleteAccount}>
            <Card variant="default" padding="md" style={styles.dangerCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingText}>
                  <BodyText weight="medium" color="error">
                    Delete Account
                  </BodyText>
                  <Caption color="muted">
                    Permanently delete your account and all data
                  </Caption>
                </View>
                <BodyText color="error" style={styles.arrow}>›</BodyText>
              </View>
            </Card>
          </TouchableOpacity>
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

  section: {
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    marginBottom: spacing.md,
  },

  settingCard: {
    marginBottom: spacing.sm,
  },

  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  settingText: {
    flex: 1,
  },

  arrow: {
    fontSize: 24,
    marginLeft: spacing.sm,
  },

  dangerCard: {
    borderWidth: 1,
    borderColor: colors.errorLight,
  },
});

export default SettingsScreen;
