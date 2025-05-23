// onboarding/slides/InterestsSlide.js
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import SlideWrapper from '../SlideWrapper';
import { INTERESTS } from '@/constants/onboardingData';

export default function InterestsSlide({ interests, toggleInterest, colors }) {
  return (
    <SlideWrapper>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: colors.primaryText }]}>Vad vill du fokusera på?</Text>
        <View style={styles.grid}>
          {INTERESTS.map((interest) => {
            const selected = interests?.includes(interest);
            return (
              <TouchableOpacity
                key={interest}
                onPress={() => toggleInterest(interest)}
                style={[styles.tag, selected && { backgroundColor: colors.cardBackground }]}
              >
                <Text style={[styles.tagText, selected && { color: colors.primaryText }]}> {interest} </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SlideWrapper>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'LatoBold',
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 40,
  },
  tag: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 4,
  },
  tagText: {
    fontFamily: 'Lato',
    color: '#555',
  },
});
