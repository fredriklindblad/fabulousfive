import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useGlobalStyles } from '@/globalStyles';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

export default function HappinessScreen() {
  const { styles: global, colors } = useGlobalStyles();
  const { t } = useTranslation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={local.container}>
      <Ionicons name="happy-outline" size={100} color={colors.primaryText} style={local.icon} />

      <Text style={[local.title, { color: colors.primaryText }]}>
        {t('happiness_title', 'Dagens reflektion')}
      </Text>

      <Text style={[local.text, { color: colors.secondaryText }]}>
        {t('happiness_intro', 'Vad gjorde dig glad idag?')}
      </Text>

      <TouchableOpacity style={[local.button, { backgroundColor: colors.cardBackground }]}>
        <Text style={[local.buttonText, { color: colors.primaryText }]}>
          {t('write_reflection', 'Skriv en reflektion')}
        </Text>
      </TouchableOpacity>

      <Text style={[local.tip, { color: colors.secondaryText }]}>
        {t('happiness_tip', 'Att reflektera över det positiva ökar din lycka.')}
      </Text>
    </ScrollView>
  );
}

const local = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'LatoBold',
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Lato',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
  tip: {
    fontSize: 14,
    fontFamily: 'Lato',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
