// constants/onboardingData.js

export const INTERESTS = [
  'Träning',
  'Kost',
  'Stillhet',
  'Sömn',
  'Socialt'
];

export const YEARS = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => (1900 + i).toString()).reverse();

export const LANGUAGES = [
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { code: 'en', label: 'English', flag: '🇺🇸' }
];

export const THEMES = [
  { value: 'light', label: 'Ljust', icon: 'sunny-outline' },
  { value: 'dark', label: 'Mörkt', icon: 'moon-outline' }
];
