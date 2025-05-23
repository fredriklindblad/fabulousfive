// onboarding/slides/NameSlide.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import SlideWrapper from '../SlideWrapper';

export default function NameSlide({ name, setName, colors }) {
  return (
    <SlideWrapper>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: colors.primaryText }]}>Vad heter du?</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ditt namn"
          placeholderTextColor="#888"
          style={[styles.input, { color: colors.primaryText }]}
        />
      </View>
    </SlideWrapper>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'LatoBold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    fontFamily: 'Lato',
    marginBottom: 40,
    width: '100%',
  },
});
