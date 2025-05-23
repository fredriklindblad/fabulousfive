import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase'; // 🔁 använd din initierade auth
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const done = await AsyncStorage.getItem('onboardingDone');
        router.replace(done === 'true' ? '/(tabs)/calm' : '/onboarding');
      } else {
        router.replace('/start/welcome');
      }
    });

    return unsubscribe;
  }, []);

  return null;
}
