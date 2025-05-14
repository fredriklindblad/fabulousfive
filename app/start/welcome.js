import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { styles: global, colors } = useGlobalStyles();

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      {/* 🎬 Video för mobil */}
      {Platform.OS !== 'web' ? (
        <Video
          source={require('../../assets/start-background.mp4')}
          rate={1.0}
          volume={0.0}
          isMuted
          resizeMode="cover"
          shouldPlay
          isLooping
          style={[StyleSheet.absoluteFill]} // flytta uppåt för att visa nedre delen
        />
      ) : (
        <video
          src="/start-background.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'fixed', // viktig: täcker hela viewporten
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            border: 'none',
            margin: 0,
            padding: 0,
            zIndex: -1, // bakom alla andra element
            display: 'block',
            overflow: 'hidden',
          }}
        />
      )}

      {/* 🔲 Text & knappar ovanpå */}
      <View style={local.overlay}>
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
    </View>
  );
}

const local = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    position: 'relative', // säkerställer att det ligger ovanpå video
    zIndex: 1,
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
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
});
