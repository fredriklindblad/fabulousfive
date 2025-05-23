import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SlideWrapper({ children }) {
  return (
    <View style={styles.slide}>
      <View style={styles.spacer} />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 200, // luft till navigation
  },
  spacer: {
    flex: 1,
  },
  content: {
    width: '100%',
  },
});
