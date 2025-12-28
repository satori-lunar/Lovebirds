import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  withPadding?: boolean;
  centered?: boolean;
  keyboardAvoiding?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  withPadding = true,
  centered = false,
  keyboardAvoiding = false,
  style,
  contentStyle,
}) => {
  const contentContainerStyle: ViewStyle[] = [
    withPadding && styles.padding,
    centered && styles.centered,
    contentStyle,
  ].filter(Boolean) as ViewStyle[];

  const renderContent = () => {
    if (scrollable) {
      return (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            ...contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      );
    }

    return (
      <View style={[styles.content, ...contentContainerStyle]}>
        {children}
      </View>
    );
  };

  const content = renderContent();

  if (keyboardAvoiding) {
    return (
      <SafeAreaView style={[styles.container, style]}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          {content}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, style]}>
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  keyboardAvoid: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  padding: {
    paddingHorizontal: spacing.screenPadding,
  },

  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenContainer;
