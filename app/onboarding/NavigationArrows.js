// onboarding/NavigationArrows.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Pilar för att navigera mellan slides, placeras nere till vänster och höger.
 * @param {function} onBack - Funktion att gå bakåt
 * @param {function} onNext - Funktion att gå framåt
 * @param {boolean} showBack - Om vänsterpilen ska visas
 * @param {boolean} showNext - Om högerpilen ska visas
 */
export default function NavigationArrows({ onBack, onNext, showBack = true, showNext = true, color = '#000' }) {
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity onPress={onBack} style={styles.arrowButtonLeft}>
          <Ionicons name="arrow-back" size={24} color={color} />
        </TouchableOpacity>
      )}
      {showNext && (
        <TouchableOpacity onPress={onNext} style={styles.arrowButtonRight}>
          <Ionicons name="arrow-forward" size={24} color={color} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  arrowButtonLeft: {
    position: 'absolute',
    left: 20,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 30,
  },
  arrowButtonRight: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 30,
  },
});