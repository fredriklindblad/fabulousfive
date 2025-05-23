// components/SettingsPanel.js
import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { signOutUser } from '@/services/auth';
import { useRouter } from 'expo-router';

export default function SettingsPanel({ visible, toggle, panHandlers, animationValue }) {
  const { theme, setTheme } = useThemeContext();
  const { language, changeLanguage } = useLanguageContext();
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.replace('/(auth)/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (!visible) return null;

  return (
    <>
      <TouchableOpacity
        style={styles.backdrop}
        onPress={toggle}
      />
      <Animated.View
        {...panHandlers}
        style={[styles.panel, { left: animationValue }]}
      >
        <Text style={styles.title}>{t('settings', 'Inställningar')}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>☀️🌙 Light/Dark</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
            thumbColor={theme === 'dark' ? '#fff' : '#888'}
            trackColor={{ false: '#ccc', true: '#5D3E17' }}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{language === 'sv' ? '🇸🇪 Svenska' : '🇺🇸 English'}</Text>
          <Switch
            value={language === 'en'}
            onValueChange={(value) => changeLanguage(value ? 'en' : 'sv')}
            thumbColor={language === 'en' ? '#fff' : '#888'}
            trackColor={{ false: '#ccc', true: '#5D3E17' }}
          />
        </View>

        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:support@fabulousfive.se')}
          style={styles.row}
        >
          <Ionicons name="mail-outline" size={20} color="#333" />
          <Text style={[styles.label, { marginLeft: 8 }]}>info@fabulousfive.se</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>{t('logout', 'Logga ut')}</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 98,
  },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '50%',
    padding: 20,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    zIndex: 99,
  },
  title: {
    fontSize: 20,
    fontFamily: 'LatoBold',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Lato',
    color: '#333',
  },
  logoutButton: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#DBBEC0',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'LatoBold',
  },
});
