import '@/services/i18n';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider } from '@/ThemeContext';
import { LanguageProvider } from '@/LanguageContext';
import { UserProvider } from '@/contexts/UserContext';
import { Platform } from 'react-native';


export default function AppLayout() {
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
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <Slot />
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
