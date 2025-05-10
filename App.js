// Huvudfil som hanterar auth state och navigation
import './services/firebase';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from './navigation/TabNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import OnboardingScreen from './screens/OnboardingScreen';
import i18n from './services/i18n';
import { useFonts } from 'expo-font';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

const CustomTheme = {
    dark: false,
    colors: {
      primary: '#5D3E17',
      background: '#DAC9B9',
      card: '#DAC9B9',
      text: '#5D3E17',
      border: '#DBBEC0',
      notification: '#5D3E17',
    },
  };

export default function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [fontsLoaded] = useFonts({
    Lato: Lato_400Regular,
    'Lato-Bold': Lato_700Bold,
  });

  useEffect(() => {
    const loadLang = async () => {
      try {
        const lang = await AsyncStorage.getItem('lang');
        if (lang) await i18n.changeLanguage(lang);
      } catch (e) {
        console.warn('Kunde inte sätta språk:', e);
      }
    };
    loadLang();
  }, []);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const done = await AsyncStorage.getItem('onboardingDone');
        setShowOnboarding(done !== 'true');
      } catch (e) {
        console.warn('Kunde inte läsa onboarding-status:', e);
        setShowOnboarding(false);
      }
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);

  if (!fontsLoaded || showOnboarding === null || !authChecked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  if (showOnboarding) {
    return <OnboardingScreen onFinish={() => setShowOnboarding(false)} />;
  }
  
  return (
    <NavigationContainer theme={CustomTheme}>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
  
}
