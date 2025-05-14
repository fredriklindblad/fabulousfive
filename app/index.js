import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getItem } from '@/services/storage';

export default function IndexRedirect() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    getItem('onboardingDone').then((value) => {
      setOnboarded(value === 'true');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;

  if (!user) return <Redirect href="/(auth)" />;
  if (!onboarded) return <Redirect href="/(auth)/onboarding" />;
  return <Redirect href="/(tabs)/feed" />;
}
