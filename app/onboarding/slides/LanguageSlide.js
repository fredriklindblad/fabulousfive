// onboarding/slides/LanguageSlide.js
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import SlideWrapper from '../SlideWrapper';
import { LANGUAGES } from '@/constants/onboardingData';

export default function LanguageSlide({ lang, setLang, colors }) {
  return (
    <SlideWrapper>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: colors.primaryText }]}>Välj språk</Text>
        <View style={styles.row}>
          {LANGUAGES.map(({ code, label, flag }) => {
            const selected = lang === code;
            return (
              <TouchableOpacity
                key={code}
                onPress={() => setLang(code)}
                style={[styles.option, selected && { backgroundColor: colors.cardBackground, borderColor: colors.primaryText }]}
              >
                <Text style={styles.flag}>{flag}</Text>
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
  flag: {
    fontSize: 48,
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'LatoBold',
  },
});
