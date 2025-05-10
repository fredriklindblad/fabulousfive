// Komponent för att visa mål
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GoalCard({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e6f4ea',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  }
});
