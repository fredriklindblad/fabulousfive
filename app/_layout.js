import '@/services/i18n';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { UserProvider } from '@/contexts/UserContext';
import { ToastProvider } from '@/components/Toast';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Layout() {
  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato-Regular.ttf'),
    LatoBold: require('../assets/fonts/Lato-Bold.ttf'),
    LatoItalic: require('../assets/fonts/Lato-Italic.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <ThemeProvider>
        <LanguageProvider>
          <UserProvider>
            <ToastProvider>
              <Slot />
            </ToastProvider>
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
}
