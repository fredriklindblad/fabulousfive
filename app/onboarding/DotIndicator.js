// onboarding/DotIndicator.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * Prickar högst upp som visar var i onboardingen man är.
 * @param {number} total - Totalt antal steg
 * @param {number} current - Aktuellt steg
 */
export default function DotIndicator({ total, current, activeColor = '#000', inactiveColor = '#ccc' }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, { backgroundColor: i === current ? activeColor : inactiveColor }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
});