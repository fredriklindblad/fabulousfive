import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function IndexRedirect() {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('onboardingDone').then((value) => {
      setHasOnboarded(value === 'true');
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  return <Redirect href={hasOnboarded ? '/(auth)' : '/onboarding'} />;
}
