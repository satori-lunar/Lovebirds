import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateStorage } from 'zustand/middleware';

/**
 * Cross-platform storage adapter
 * Uses localStorage on web, AsyncStorage on native
 */
export const crossPlatformStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(name);
      } catch {
        return null;
      }
    }
    return AsyncStorage.getItem(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(name, value);
      } catch {
        // Ignore storage errors on web
      }
      return;
    }
    return AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(name);
      } catch {
        // Ignore storage errors on web
      }
      return;
    }
    return AsyncStorage.removeItem(name);
  },
};

export default crossPlatformStorage;
