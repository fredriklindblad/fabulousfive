import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function StartScreen() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      if (Platform.OS === 'web') {
        setInitialRoute('/start/welcome');
        return;
      }

      const onboardingDone = await AsyncStorage.getItem('onboardingDone');
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user && onboardingDone === 'true') {
          setInitialRoute('/(tabs)/calm');
        } else if (user && onboardingDone !== 'true') {
          setInitialRoute('/onboarding');
        } else {
          setInitialRoute('/start/welcome');
        }
      });
    };

    checkStatus();
  }, []);

  if (!initialRoute) return null;
  return <Redirect href={initialRoute} />;
}
