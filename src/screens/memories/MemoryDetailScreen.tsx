import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import {
  ScreenContainer,
  Heading1,
  BodyText,
} from '../../components/ui';
import { spacing } from '../../constants/theme';

type MemoryDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MemoryDetail'>;
  route: RouteProp<RootStackParamList, 'MemoryDetail'>;
};

const MemoryDetailScreen: React.FC<MemoryDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { memoryId } = route.params;

  return (
    <ScreenContainer scrollable withPadding>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BodyText color="secondary">← Back</BodyText>
        </TouchableOpacity>

        <View style={styles.content}>
          <Heading1>Memory Detail</Heading1>
          <BodyText color="secondary">
            Memory ID: {memoryId}
          </BodyText>
          <BodyText color="muted" style={styles.placeholder}>
            This screen would display the full memory details, photos, and
            allow editing or deleting the memory.
          </BodyText>
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

  content: {
    flex: 1,
  },

  placeholder: {
    marginTop: spacing.lg,
    lineHeight: 22,
  },
});

export default MemoryDetailScreen;
