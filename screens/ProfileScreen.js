// Skärm för profil/utloggning
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOutUser } from '../services/auth';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = async () => {
    const newLang = i18n.language === 'sv' ? 'en' : 'sv';
    await i18n.changeLanguage(newLang);
    await AsyncStorage.setItem('lang', newLang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('profile')}</Text>
      <Button title={t('logout')} onPress={signOutUser} />
      <View style={styles.space} />
      <Button title={t('change_language')} onPress={toggleLanguage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 24, marginBottom: 20 },
  space: { height: 20 }
});
