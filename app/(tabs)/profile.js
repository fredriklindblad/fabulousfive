import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { signOutUser } from '@/services/auth';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const toggleLanguage = async () => {
    const newLang = i18n.language === 'sv' ? 'en' : 'sv';
    await i18n.changeLanguage(newLang);
    await AsyncStorage.setItem('lang', newLang);
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      await AsyncStorage.removeItem('onboardingDone'); // valfritt
      router.replace('/(auth)/login');
    } catch (err) {
      Alert.alert(t('logout_failed', 'Utloggning misslyckades'), err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('profile', 'Profil')}</Text>
      <Button title={t('logout', 'Logga ut')} onPress={handleLogout} />
      <View style={styles.space} />
      <Button title={t('change_language', 'Byt språk')} onPress={toggleLanguage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 24, marginBottom: 20 },
  space: { height: 20 }
});
