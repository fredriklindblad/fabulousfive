import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { loginUser, resetPassword } from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '@/services/firebase';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles'; // ⬅️ Ny import

console.log('✅ login.js loaded');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const router = useRouter();
  const { styles: global, colors } = useGlobalStyles(); // ⬅️ Dark/light hook

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace('/(tabs)/feed');
      }
    });
    return unsubscribe;
  }, []);


const handleLogin = async () => {
  try {
    await loginUser(email.trim(), password);
    router.replace('/(tabs)/feed');
  } catch (error) {
    console.log('❌ Login error:', error.code);
    let message = '';

    switch (error.code) {
      case 'auth/invalid-email':
        message = t('invalid_email', 'Ogiltig e-postadress.');
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        message = t('wrong_credentials', 'Fel e-postadress eller lösenord.');
        break;
      case 'auth/too-many-requests':
        message = t('too_many_attempts', 'För många försök – försök igen senare.');
        break;
      default:
        message = error.message;
    }

    Alert.alert(t('login_failed', 'Inloggning misslyckades'), message);
  }
};


  return (
    <KeyboardAvoidingView
      style={[local.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity onPress={() => router.replace('/(auth)')}>
        <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
      </TouchableOpacity>
      <Text style={[local.title, { color: colors.primaryText }]}>
        {t('login', 'Logga in')}
      </Text>

      <TextInput
        placeholder={t('email', 'E-post')}
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={[local.input, { color: colors.primaryText }]}
        autoFocus
      />
      <TextInput
        placeholder={t('password', 'Lösenord')}
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={[local.input, { color: colors.primaryText }]}
      />

      <TouchableOpacity style={[local.button, { backgroundColor: colors.primaryText }]} onPress={handleLogin}>
        <Text style={local.buttonText}>{t('login', 'Logga in')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (!email) {
            Alert.alert(t('error', 'Fel'), t('enter_email_first', 'Fyll i din e-postadress först.'));
            return;
          }
          resetPassword(email.trim())
            .then(() => {
              router.replace('/(auth)/reset-sent');
            })
            .catch((err) => {
              Alert.alert(t('error', 'Fel'), err.message);
            });
        }}
      >
        <Text style={[local.link, { color: colors.secondaryText }]}>
          {t('forgot_password', 'Glömt lösenord?')}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const local = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Lato',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
  link: {
    fontSize: 14,
    fontFamily: 'Lato',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
