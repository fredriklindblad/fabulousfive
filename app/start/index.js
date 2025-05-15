// ✅ start/index.js uppdaterad för onboarding-kontroll
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

      const auth = getAuth();
      const onboardingDone = await AsyncStorage.getItem('onboardingDone');

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          setInitialRoute('/start/welcome');
        } else if (onboardingDone === 'true') {
          setInitialRoute('/(tabs)/calm');
        } else {
          setInitialRoute('/onboarding');
        }
      });

      return unsubscribe;
    };

    checkStatus();
  }, []);

  if (!initialRoute) return null;
  return <Redirect href={initialRoute} />;
}
