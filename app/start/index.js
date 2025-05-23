import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase'; // ✅ trygg auth

export default function StartScreen() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setInitialRoute('/start/welcome');
      } else {
        const onboardingDone = await AsyncStorage.getItem('onboardingDone');
        setInitialRoute(onboardingDone === 'true' ? '/(tabs)/calm' : '/onboarding');
      }
    });

    return unsubscribe;
  }, []);

  if (!initialRoute) return null;
  return <Redirect href={initialRoute} />;
}
