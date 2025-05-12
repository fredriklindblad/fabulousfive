import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { signOutUser } from '@/services/auth';
import { GlobalStyles, GlobalColors } from '@/globalStyles';

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
      await AsyncStorage.removeItem('onboardingDone');
      router.replace('/(auth)/login');
    } catch (err) {
      Alert.alert(t('logout_failed', 'Utloggning misslyckades'), err.message);
    }
  };

  return (
    <View style={[GlobalStyles.container, styles.center]}>
      <Text style={GlobalStyles.header}>{t('profile', 'Profil')}</Text>

      <TouchableOpacity style={GlobalStyles.buttonPrimary} onPress={handleLogout}>
        <Text style={GlobalStyles.buttonText}>{t('logout', 'Logga ut')}</Text>
      </TouchableOpacity>

      <View style={styles.space} />

      <TouchableOpacity style={GlobalStyles.buttonPrimary} onPress={toggleLanguage}>
        <Text style={GlobalStyles.buttonText}>{t('change_language', 'Byt språk')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    height: 20,
  },
});
