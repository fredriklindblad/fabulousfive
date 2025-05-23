import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SlideWrapper from '../SlideWrapper';
import { YEARS } from '@/constants/onboardingData';

export default function BirthyearSlide({ birthyear, setBirthyear, colors }) {
  return (
    <SlideWrapper>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: colors.primaryText }]}>Vilket år är du född?</Text>
        <View style={[styles.pickerWrapper, { backgroundColor: colors.cardBackground }]}>
          <Picker
            selectedValue={birthyear}
            onValueChange={(itemValue) => setBirthyear(itemValue)}
            style={styles.picker}
            itemStyle={{
              fontSize: 22,
              fontFamily: 'LatoBold',
              color: colors.primaryText,
            }}
          >
            {YEARS.map((year) => (
              <Picker.Item label={year} value={year} key={year} />
            ))}
          </Picker>
        </View>
      </View>
    </SlideWrapper>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontFamily: 'LatoBold',
    marginBottom: 16,
    textAlign: 'center',
  },
  pickerWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    height: 200,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  picker: {
    width: '100%',
    height: '100%',
  },
});
