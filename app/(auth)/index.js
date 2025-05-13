import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles';

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { styles: global, colors } = useGlobalStyles();

  return (
    <View style={[local.container, { backgroundColor: colors.background }]}>
      <Text style={[local.title, { color: colors.primaryText }]}>
        {t('welcome_title', 'Välkommen till Fabulous Five!')}
      </Text>

      <TouchableOpacity
        style={[local.button, { backgroundColor: colors.primaryText }]}
        onPress={() => router.push('/(auth)/login')}
      >
        <Text style={local.buttonText}>{t('login', 'Logga in')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[local.button, { backgroundColor: colors.cardBackground }]}
        onPress={() => router.push('/(auth)/register')}
      >
        <Text style={[local.buttonText, { color: colors.primaryText }]}>
          {t('register', 'Skapa konto')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const local = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
    color: '#fff',
  },
});
