import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import sv from '@/locales/sv.js';
import en from '@/locales/en.js';

const userLocale = Localization.locale ?? 'en';

console.log('🌍 Initierar i18n med locale:', Localization.locale);

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    sv: { translation: sv },
    en: { translation: en }
  },
  lng: userLocale.startsWith('sv') ? 'sv' : 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});


export default i18n;
