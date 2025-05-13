import { Stack } from 'expo-router';
import { ThemeProvider } from '@/ThemeContext';
import { LanguageProvider } from '@/LanguageContext';

export default function AuthLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </LanguageProvider>
    </ThemeProvider>
  );
}
