import React from 'react';
import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/constants/theme';

// Enable react-native-screens
enableScreens(true);

export default function App() {
  // Use View wrapper for web compatibility
  const Wrapper = Platform.OS === 'web' ? View : GestureHandlerRootView;

  return (
    <Wrapper style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor={colors.background} />
        <RootNavigator />
      </SafeAreaProvider>
    </Wrapper>
  );
}
