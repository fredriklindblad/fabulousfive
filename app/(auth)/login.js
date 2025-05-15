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
import { useGlobalStyles } from '@/globalStyles';
import { useToast } from '@/components/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const { t } = useTranslation();
  const router = useRouter();
  const { styles: global, colors } = useGlobalStyles();
  const { showToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        checkOnboarding();
      }
    });
    return unsubscribe;
  }, []);

  const checkOnboarding = async () => {
    const done = await AsyncStorage.getItem('onboardingDone');
    if (done === 'true') {
      router.replace('/(tabs)/calm');
    } else {
      router.replace('/onboarding');
    }
  };


  const handleLogin = async () => {
    try {
      await loginUser(email.trim(), password);
      showToast(t('login_success', 'Inloggning lyckades!'), 'success');
      checkOnboarding();
    } catch (error) {
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
      showToast(message);
    }
  };
  
  const handlePasswordReset = async () => {
    if (!email) {
      showToast(t('enter_email_first', 'Fyll i din e-postadress först.'));
      return;
    }
    try {
      await resetPassword(email.trim());
      setResetSuccess(true);
      setTimeout(() => {
        setShowReset(false);
        setResetSuccess(false);
      }, 5000);
    } catch (err) {
      showToast(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[local.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity onPress={() => router.replace('/start/welcome')}>
        <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
      </TouchableOpacity>

      <Text style={[local.title, { color: colors.primaryText }]}>
        {t('login', 'Logga in')}
      </Text>

      {!showReset ? (
        <>
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

          <TouchableOpacity onPress={() => setShowReset(true)}>
            <Text style={[local.link, { color: colors.secondaryText }]}>
              {t('forgot_password', 'Glömt lösenord?')}
            </Text>
          </TouchableOpacity>
        </>
      ) : resetSuccess ? (
        <Text style={[local.label, { color: colors.secondaryText }]}>
          {t('reset_sent', 'Länk skickad! Kolla din inkorg.')}{'\n'}
          {t('reset_info', 'Du återgår till inloggning om några sekunder...')}
        </Text>
      ) : (
        <>
          <Text style={[local.label, { color: colors.secondaryText }]}>
            {t('reset_instruction', 'Ange din e-postadress nedan')}
          </Text>
          <TextInput
            placeholder={t('email', 'E-post')}
            placeholderTextColor="#999"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={[local.input, { color: colors.primaryText }]}
          />
          <TouchableOpacity style={[local.button, { backgroundColor: colors.primaryText }]} onPress={handlePasswordReset}>
            <Text style={local.buttonText}>{t('reset_password', 'Återställ lösenord')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowReset(false)}>
            <Text style={[local.link, { color: colors.secondaryText }]}>
              {t('back_to_login', 'Tillbaka till inloggning')}
            </Text>
          </TouchableOpacity>
        </>
      )}
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
  label: {
    fontSize: 14,
    fontFamily: 'Lato',
    textAlign: 'center',
    marginBottom: 16,
  },
});
