import React, { useState } from 'react';
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
import { createUser } from '@/services/auth';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { GlobalColors } from '@/globalStyles';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { t } = useTranslation();
  const router = useRouter();

  const handleRegister = async () => {
    if (password.length < 6) {
      Alert.alert(t('registration_failed', 'Registrering misslyckades'), t('password_too_short', 'Lösenordet måste vara minst 6 tecken.'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('registration_failed', 'Registrering misslyckades'), t('passwords_not_matching', 'Lösenorden matchar inte.'));
      return;
    }

    try {
      await createUser(email.trim(), password);
      router.replace('/(tabs)/feed');
    } catch (error) {
      Alert.alert(t('registration_failed', 'Registrering misslyckades'), error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: GlobalColors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>{t('register', 'Skapa konto')}</Text>

      <TextInput
        placeholder={t('email', 'E-post')}
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder={t('password', 'Lösenord')}
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        placeholder={t('confirm_password', 'Bekräfta lösenord')}
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>{t('register', 'Skapa konto')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.link}>
          {t('already_account', 'Har du redan ett konto? Logga in här.')}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    color: GlobalColors.primaryText,
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
    color: GlobalColors.primaryText,
    marginBottom: 16,
  },
  button: {
    backgroundColor: GlobalColors.primaryText,
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
    color: GlobalColors.secondaryText,
    fontFamily: 'Lato',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
