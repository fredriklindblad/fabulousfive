import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { saveItem } from '@/services/storage';
import { useLanguageContext } from '@/LanguageContext';
import { useThemeContext } from '@/ThemeContext';
import { useGlobalStyles } from '@/globalStyles';
import { useRouter } from 'expo-router';
import { saveUserProfile } from '@/services/firebase';
import { Picker } from '@react-native-picker/picker';

const INTERESTS = ['Träning', 'Kost', 'Stillhet', 'Sömn', 'Socialt'];

export default function OnboardingScreen() {
  const [name, setName] = useState('');
  const [lang, setLang] = useState('sv');
  const [interests, setInterests] = useState([]);
  const [theme, setThemeState] = useState('light');
  const [birthyear, setBirthyear] = useState('');
  const YEARS = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => (1900 + i).toString());


  const { changeLanguage } = useLanguageContext();
  const { setTheme } = useThemeContext();
  const { styles: global, colors } = useGlobalStyles();
  const router = useRouter();

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const saveSettings = async () => {
    await saveItem('onboardingDone', 'true');
    await saveItem('name', name);
    await saveItem('interests', JSON.stringify(interests));
    await saveItem('theme', theme);
    await saveItem('lang', lang);
    await saveItem('birthyear', birthyear);
    await changeLanguage(lang);
    await setTheme(theme);
    await saveUserProfile({
      name,
      interests,
      lang,
      theme,
      birthyear,
    });
    router.replace('/auth/login');
  };

  return (
    <ScrollView
      contentContainerStyle={[local.container, { backgroundColor: colors.background }]}
    >
      <Text style={[local.title, { color: colors.primaryText }]}>Välkommen till Fabulous Five!</Text>

      <Text style={[local.label, { color: colors.secondaryText }]}>Vad heter du?</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ditt namn"
        placeholderTextColor="#888"
        style={[local.input, { color: colors.primaryText }]}
      />
      <Text style={[local.label, { color: colors.secondaryText }]}>Födelseår</Text>
      <View style={[local.input, { padding: 0 }]}>
        <Picker
          selectedValue={birthyear}
          onValueChange={(itemValue) => setBirthyear(itemValue)}
          style={{ height: 48, color: colors.primaryText }}
          dropdownIconColor={colors.primaryText}
        >
          <Picker.Item label="Välj år" value="" />
          {YEARS.map((year) => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>
      </View>
      <Text style={[local.label, { color: colors.secondaryText }]}>Välj dina fokusområden</Text>
      <View style={local.interestContainer}>
        {INTERESTS.map((interest) => (
          <TouchableOpacity
            key={interest}
            onPress={() => toggleInterest(interest)}
            style={[
              local.interestButton,
              interests.includes(interest) && { backgroundColor: colors.cardBackground },
            ]}
          >
            <Text
              style={[
                local.interestText,
                interests.includes(interest) && { fontWeight: 'bold', color: colors.primaryText },
              ]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[local.label, { color: colors.secondaryText }]}>Välj språk:</Text>
      <View style={local.langRow}>
        <TouchableOpacity
          style={[
            local.langButton,
            lang === 'sv' && { backgroundColor: colors.cardBackground },
          ]}
          onPress={() => setLang('sv')}
        >
          <Text style={{ color: colors.primaryText }}>🇸🇪 Svenska</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            local.langButton,
            lang === 'en' && { backgroundColor: colors.cardBackground },
          ]}
          onPress={() => setLang('en')}
        >
          <Text style={{ color: colors.primaryText }}>🇺🇸 English</Text>
        </TouchableOpacity>
      </View>

      <Text style={[local.label, { color: colors.secondaryText }]}>Välj tema:</Text>
      <View style={local.langRow}>
        <TouchableOpacity
          style={[
            local.langButton,
            theme === 'light' && { backgroundColor: colors.cardBackground },
          ]}
          onPress={() => setThemeState('light')}
        >
          <Text style={{ color: colors.primaryText }}>🌞 Ljust</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            local.langButton,
            theme === 'dark' && { backgroundColor: colors.cardBackground },
          ]}
          onPress={() => setThemeState('dark')}
        >
          <Text style={{ color: colors.primaryText }}>🌙 Mörkt</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[local.startButton, { backgroundColor: colors.primaryText }]}
        onPress={saveSettings}
      >
        <Text style={local.startButtonText}>Starta appen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const local = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Lato',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Lato',
    marginBottom: 24,
  },
  interestContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  interestButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 4,
  },
  interestText: {
    fontFamily: 'Lato',
    color: '#555',
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  langButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  startButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 24,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
});
