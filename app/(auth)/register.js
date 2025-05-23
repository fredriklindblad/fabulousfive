import React, { useState } from 'react';
import {
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { registerUser } from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { t } = useTranslation();
  const router = useRouter();
  const { styles: global, colors } = useGlobalStyles();

  const handleRegister = async () => {
    if (password.length < 6) {
      Alert.alert(
        t('registration_failed', 'Registrering misslyckades'),
        t('password_too_short', 'Lösenordet måste vara minst 6 tecken.')
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        t('registration_failed', 'Registrering misslyckades'),
        t('passwords_not_matching', 'Lösenorden matchar inte.')
      );
      return;
    }

    try {
      await registerUser(email.trim(), password);
      await AsyncStorage.setItem('onboardingDone', 'false');
      router.replace('/onboarding');
    } catch (error) {
      Alert.alert(t('registration_failed', 'Registrering misslyckades'), error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={local.scrollForm}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => router.replace('/start/welcome')}
            style={{ alignSelf: 'flex-start', marginBottom: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
          </TouchableOpacity>

          <Text style={[local.title, { color: colors.primaryText }]}>
            {t('register', 'Skapa konto')}
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
          <TextInput
            placeholder={t('password', 'Lösenord')}
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[local.input, { color: colors.primaryText }]}
          />
          <TextInput
            placeholder={t('confirm_password', 'Bekräfta lösenord')}
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={[local.input, { color: colors.primaryText }]}
          />

          <TouchableOpacity
            style={[local.button, { backgroundColor: colors.primaryText }]}
            onPress={handleRegister}
          >
            <Text style={local.buttonText}>{t('register', 'Skapa konto')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={[local.link, { color: colors.secondaryText }]}>
              {t('already_account', 'Har du redan ett konto? Logga in här.')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const local = StyleSheet.create({
  scrollForm: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 240,
    position: 'relative',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginBottom: 24,
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
