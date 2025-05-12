import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { GlobalColors, GlobalStyles } from '@/globalStyles';

const INTERESTS = ['Träning', 'Kost', 'Stillhet', 'Sömn', 'Socialt'];

export default function OnboardingScreen() {
  const [name, setName] = useState('');
  const [lang, setLang] = useState('sv');
  const [interests, setInterests] = useState([]);
  const { i18n } = useTranslation();
  const router = useRouter();

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const saveSettings = async () => {
    await AsyncStorage.setItem('onboardingDone', 'true');
    await AsyncStorage.setItem('lang', lang);
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('interests', JSON.stringify(interests));
    await i18n.changeLanguage(lang);
    router.replace('/(auth)/login');
  };

  return (
    <View style={[GlobalStyles.container, { backgroundColor: GlobalColors.background }]}>
      <Text style={GlobalStyles.header}>Välkommen till Fabulous Five!</Text>

      <Text style={styles.label}>Vad heter du?</Text>
      <TextInput
        placeholder="Ditt namn"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Vad är du mest intresserad av att utveckla i nuläget?</Text>
      <View style={styles.interestContainer}>
        {INTERESTS.map((interest) => (
          <TouchableOpacity
            key={interest}
            onPress={() => toggleInterest(interest)}
            style={[
              styles.interestButton,
              interests.includes(interest) && styles.interestButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.interestText,
                interests.includes(interest) && styles.interestTextSelected,
              ]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Välj språk:</Text>
      <View style={styles.langRow}>
        <Button title="🇸🇪 Svenska" onPress={() => setLang('sv')} />
        <Button title="🇬🇧 English" onPress={() => setLang('en')} />
      </View>

      <TouchableOpacity style={styles.startButton} onPress={saveSettings}>
        <Text style={styles.startButtonText}>Starta appen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontFamily: 'Lato',
    color: GlobalColors.primaryText,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    fontFamily: 'Lato',
  },
  interestContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 6,
  },
  interestButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 4,
  },
  interestButtonSelected: {
    backgroundColor: GlobalColors.cardBackground, // #F1DFDF
  },
  interestText: {
    fontFamily: 'Lato',
    color: '#444',
  },
  interestTextSelected: {
    fontWeight: 'bold',
    color: GlobalColors.primaryText,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: GlobalColors.primaryText,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignSelf: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
});
