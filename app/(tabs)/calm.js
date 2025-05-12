import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalColors, GlobalStyles } from '@/globalStyles';

export default function CalmScreen() {
  return (
    <View style={[styles.container, { backgroundColor: GlobalColors.background }]}>
      <Text style={styles.title}>🧘‍♀️ Calm</Text>
      <Text style={styles.text}>
        Här kan du hitta meditation, stillhet och återhämtning.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: GlobalColors.primaryText,
    fontFamily: 'Lato',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: GlobalColors.primaryText,
    fontFamily: 'Lato',
  },
});
