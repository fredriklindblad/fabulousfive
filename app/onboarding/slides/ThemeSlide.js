// onboarding/slides/ThemeSlide.js
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SlideWrapper from '../SlideWrapper';
import { THEMES } from '@/constants/onboardingData';

export default function ThemeSlide({ theme, setTheme, colors }) {
  return (
    <SlideWrapper>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: colors.primaryText }]}>Välj tema</Text>
        <View style={styles.row}>
          {THEMES.map(({ value, label, icon }) => {
            const selected = theme === value;
            return (
              <TouchableOpacity
                key={value}
                onPress={() => setTheme(value)}
                style={[styles.option, selected && { backgroundColor: colors.cardBackground, borderColor: colors.primaryText }]}
              >
                <Ionicons name={icon} size={48} color={colors.primaryText} />
                <Text style={[styles.label, { color: colors.primaryText }]}>{label}</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    gap: 16,
    marginBottom: 40,
  },
  option: {
    width: 140,
    height: 140,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'LatoBold',
  },
});
