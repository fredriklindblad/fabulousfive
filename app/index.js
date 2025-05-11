import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Index() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      const onboardingDone = await AsyncStorage.getItem('onboardingDone');
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (!onboardingDone) {
          setInitialRoute('/onboarding');
        } else if (user) {
          setInitialRoute('/(tabs)/feed');
        } else {
          setInitialRoute('/(auth)/login');
        }
      });
    };

    checkStatus();
  }, []);

  if (!initialRoute) return null;

  return <Redirect href={initialRoute} />;
}
