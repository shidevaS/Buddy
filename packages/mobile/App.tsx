/**
 * @tuiton/mobile
 * Expo React Native entry point (Phase 1 scaffold).
 * Shares types & API client with web via @tuiton/shared.
 */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.card}>
        <Text style={styles.title}>Tuiton</Text>
        <Text style={styles.subtitle}>Mobile companion (Phase 1)</Text>
        <Text style={styles.hint}>
          Same API client & types as web via @tuiton/shared.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#38bdf8',
    marginBottom: 16,
  },
  hint: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
