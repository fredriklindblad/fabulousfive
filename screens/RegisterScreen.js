import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../services/auth';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleRegister = async () => {
    try {
      await registerUser(email, password);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert(t('error'), error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('register')}</Text>
      <TextInput
        placeholder={t('email')}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder={t('password')}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title={t('register')} onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        {t('already_account')}
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
