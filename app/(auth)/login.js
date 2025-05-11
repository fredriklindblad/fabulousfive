import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { loginUser } from '@/services/auth';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
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
      Alert.alert(t('login_failed', 'Inloggning misslyckades'), error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('login', 'Logga in')}</Text>
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
      <Button title={t('login', 'Logga in')} onPress={handleLogin} />
      <Text
        style={styles.link}
        onPress={() => router.push('/(auth)/register')}
      >
        {t('no_account', 'Har du inget konto? Skapa ett här.')}
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
