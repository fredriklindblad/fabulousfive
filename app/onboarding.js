import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const [lang, setLang] = useState('sv');
  const { i18n } = useTranslation();
  const router = useRouter();

  const saveSettings = async () => {
    await AsyncStorage.setItem('onboardingDone', 'true');
    await AsyncStorage.setItem('lang', lang);
    await i18n.changeLanguage(lang);
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Välkommen till Fabulous Five!</Text>
      <Text style={styles.text}>Välj språk:</Text>
      <View style={styles.row}>
        <Button title="🇸🇪 Svenska" onPress={() => setLang('sv')} />
        <Button title="🇬🇧 English" onPress={() => setLang('en')} />
      </View>
      <View style={styles.spacer} />
      <Button title="Starta appen" onPress={saveSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 30, flex: 1, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  spacer: { height: 20 }
});
