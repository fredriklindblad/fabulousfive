import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function OnboardingScreen({ onFinish }) {
  const [lang, setLang] = useState('sv');
  const [theme, setTheme] = useState('light');
  const { i18n } = useTranslation();

  const saveSettings = async () => {
    await AsyncStorage.setItem('onboardingDone', 'true');
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem('theme', theme);
    await AsyncStorage.setItem('lang', lang);
    onFinish();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Välkommen till Fabulous Five!</Text>
      <Text>Välj språk:</Text>
      <View style={styles.row}>
        <Button title="Svenska 🇸🇪" onPress={() => setLang('sv')} />
        <Button title="English 🇬🇧" onPress={() => setLang('en')} />
      </View>
      <Text>Välj tema:</Text>
      <View style={styles.row}>
        <Button title="Ljust" onPress={() => setTheme('light')} />
        <Button title="Mörkt" onPress={() => setTheme('dark')} />
      </View>
      <Button title="Starta appen" onPress={saveSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 30, flex: 1, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }
});
