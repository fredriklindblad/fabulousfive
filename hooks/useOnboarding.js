import { useRouter } from 'expo-router';
import { useToast } from '@/components/Toast';
import { saveItem } from '@/services/storage';
import { saveUserProfile, auth } from '@/services/firebase';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useOnboarding() {
  const router = useRouter();
  const { showToast } = useToast();
  const { changeLanguage } = useLanguageContext();
  const { setTheme } = useThemeContext();
  const { updateUserData } = useUser();

  const validateStep = ({ name, birthyear, lang, theme }) => {
    if (!name || !birthyear || !lang || !theme) {
      showToast('Fyll i alla steg innan du fortsätter');
      return false;
    }
    return true;
  };

  const saveSettings = async ({ name, birthyear, interests, lang, theme }) => {
    const user = auth.currentUser;
    if (!user) return;

    // 💾 Lokalt
    await saveItem('onboardingDone', 'true');
    await saveItem('name', name);
    await saveItem('birthyear', birthyear);
    await saveItem('interests', JSON.stringify(interests));
    await saveItem('lang', lang);
    await saveItem('theme', theme);

    await changeLanguage(lang);
    await setTheme(theme);

    // 🔥 Firestore
    await saveUserProfile({
      name,
      birthyear,
      interests,
      lang,
      theme,
      onboardingDone: true,
      image: '', // eller en default-avatar-URL om du vill
    });

    // 🔁 Uppdatera context
    if (updateUserData) {
      await updateUserData();
    }
  };

  return {
    validateStep,
    saveSettings,
  };
}
