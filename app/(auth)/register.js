import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { registerUser } from '@/services/auth';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await registerUser(email.trim(), password);
      router.replace('/(tabs)/feed'); // eller router.push('/login') om du kräver separat inlogg
    } catch (error) {
      Alert.alert(t('register_failed', 'Registrering misslyckades'), error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('register', 'Skapa konto')}</Text>
      <TextInput
        placeholder={t('email', 'E-post')}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoFocus
      />
      <TextInput
        placeholder={t('password', 'Lösenord')}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title={t('register', 'Registrera')} onPress={handleRegister} />
      <Text
        style={styles.link}
        onPress={() => router.push('/(auth)/login')}
      >
        {t('already_account', 'Har du redan ett konto? Logga in.')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: { borderBottomWidth: 1, marginVertical: 10, padding: 8 },
  header: { fontSize: 24, marginBottom: 20 },
  link: { color: 'blue', marginTop: 10 }
});
