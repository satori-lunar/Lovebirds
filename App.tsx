import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Minimal test app to debug blank page issue
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lovebirds</Text>
      <Text style={styles.subtitle}>App is loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6A53FF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
  },
});
