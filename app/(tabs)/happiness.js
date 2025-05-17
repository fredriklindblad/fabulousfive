import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useGlobalStyles } from '@/globalStyles';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import PhilosophyCard from '@/components/PhilosophyCard';

export default function HappinessScreen() {
  const { styles: global, colors } = useGlobalStyles();
  const { t } = useTranslation();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={local.container}
    >
      {/* 💭 Filosofiruta */}
      <View style={local.philosophyWrapper}>
        <PhilosophyCard
          title="Vår filosofi"
          text="Lycka handlar inte om att ha allt – utan om att uppskatta det vi redan har."
          image="https://source.unsplash.com/300x300/?happy"
          variant="topRight"
          modalContent="Vi tror att daglig reflektion över det som är bra stärker känslan av glädje och tacksamhet. En positiv inre dialog skapar en mer hållbar lycka."
        />
      </View>

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
  philosophyWrapper: {
    position: 'absolute',
    top: 24,
    left: 24,
    width: Dimensions.get('window').width * 0.5,
    aspectRatio: 1,
    zIndex: 1,
  },
  icon: {
    marginBottom: 16,
    marginTop: Dimensions.get('window').width * 0.5 + 40, // för att inte krocka med boxen
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
