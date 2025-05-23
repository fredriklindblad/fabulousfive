import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGlobalStyles } from '@/globalStyles';

const ALL_INTERESTS = ['Träning', 'Kost', 'Stillhet', 'Sömn', 'Socialt'];

export default function InterestSelector({ selectedInterests, toggleInterest }) {
  const { colors } = useGlobalStyles();

  return (
    <View style={styles.wrapper}>
      {ALL_INTERESTS.map((interest) => {
        const isSelected = selectedInterests.includes(interest);
        return (
          <TouchableOpacity
            key={interest}
            onPress={() => toggleInterest(interest)}
            style={[styles.button, isSelected && { backgroundColor: colors.cardBackground }]}
          >
            <Text
              style={[styles.text, isSelected && { fontWeight: 'bold', color: colors.primaryText }]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 4,
  },
  text: {
    fontFamily: 'Lato',
    color: '#555',
  },
});
