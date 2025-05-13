import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles'; // ⬅️ Ny hook

export default function ResetSentScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { styles: global, colors } = useGlobalStyles(); // ⬅️ färger/stilar

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={[local.container, { backgroundColor: colors.background }]}>
      <Text style={[local.title, { color: colors.primaryText }]}>
        {t('password_reset_sent', 'Lösenordsåterställning skickad')}
      </Text>
      <Text style={[local.text, { color: colors.secondaryText }]}>
        {t('check_email', 'Kolla din inkorg för återställningslänk.')}
      </Text>
      <Text style={[local.tip, { color: colors.secondaryText }]}>
        {t('check_spam', 'Tips: Kolla även skräpposten om du inte ser mejlet direkt.')}
      </Text>
      <Text style={[local.note, { color: colors.secondaryText }]}>
        {t('auto_redirect', 'Du skickas tillbaka till inloggningen om 10 sekunder...')}
      </Text>
      <TouchableOpacity style={[local.button, { backgroundColor: colors.primaryText }]} onPress={() => router.replace('/(auth)/login')}>
        <Text style={local.buttonText}>{t('back_to_login', 'Tillbaka till inloggning')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const local = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Lato',
    textAlign: 'center',
    marginBottom: 8,
  },
  tip: {
    fontSize: 14,
    fontFamily: 'Lato',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
  note: {
    fontSize: 12,
    fontFamily: 'Lato',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
});
