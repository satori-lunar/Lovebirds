import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/constants/theme';

// Enable react-native-screens
enableScreens(true);

// Mobile frame wrapper for web
const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={styles.webContainer}>
      <View style={styles.mobileFrame}>
        {children}
      </View>
    </View>
  );
};

export default function App() {
  // Use View wrapper for web compatibility
  const Wrapper = Platform.OS === 'web' ? View : GestureHandlerRootView;

  return (
    <MobileFrame>
      <Wrapper style={styles.app}>
        <SafeAreaProvider>
          <StatusBar style="dark" backgroundColor={colors.background} />
          <RootNavigator />
        </SafeAreaProvider>
      </Wrapper>
    </MobileFrame>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
  webContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  mobileFrame: {
    width: '100%',
    maxWidth: 430,
    height: '100%',
    maxHeight: 932,
    backgroundColor: colors.background,
    borderRadius: Platform.OS === 'web' ? 40 : 0,
    overflow: 'hidden',
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    // Border to simulate phone edge
    borderWidth: Platform.OS === 'web' ? 8 : 0,
    borderColor: '#2d2d44',
  },
});
