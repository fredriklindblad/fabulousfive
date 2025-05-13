// app/(tabs)/profile.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '@/LanguageContext';
import { useRouter } from 'expo-router';
import { signOutUser } from '@/services/auth';
import { useGlobalStyles } from '@/globalStyles';
import { useThemeContext } from '@/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const ALL_INTERESTS = ['Träning', 'Kost', 'Stillhet', 'Sömn', 'Socialt'];

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { changeLanguage, language } = useLanguageContext();
  const router = useRouter();
  const [name, setName] = useState('');
  const [interests, setInterests] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedInterests, setEditedInterests] = useState([]);

  const { styles: global, colors } = useGlobalStyles();
  const { theme, setTheme } = useThemeContext();

  useEffect(() => {
    const loadData = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const storedInterests = await AsyncStorage.getItem('interests');
      setName(storedName || '');
      setInterests(storedInterests ? JSON.parse(storedInterests) : []);
      setEditedName(storedName || '');
      setEditedInterests(storedInterests ? JSON.parse(storedInterests) : []);
    };
    loadData();
  }, []);

  const toggleInterest = (interest) => {
    setEditedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = async () => {
    await AsyncStorage.setItem('name', editedName);
    await AsyncStorage.setItem('interests', JSON.stringify(editedInterests));
    setName(editedName);
    setInterests(editedInterests);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      await AsyncStorage.removeItem('onboardingDone');
      router.replace('/(auth)/login');
    } catch (err) {
      Alert.alert(t('logout_failed', 'Utloggning misslyckades'), err.message);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={local.container}
    >
      <Ionicons name="flower-outline" size={120} color={colors.primaryText} style={local.icon} />

      <Text style={[local.name, { color: colors.primaryText }]}> {name || 'Ditt namn'} </Text>

      {!isEditing ? (
        <>
          <Text style={[local.subtext, { color: colors.secondaryText }]}>Dina fokusområden:</Text>
          <View style={local.interests}>
            {interests.length > 0 ? (
              interests.map((interest) => (
                <View key={interest} style={[local.tag, { backgroundColor: colors.cardBackground }]}>
                  <Text style={[local.tagText, { color: colors.primaryText }]}>{interest}</Text>
                </View>
              ))
            ) : (
              <Text style={[local.subtext, { fontStyle: 'italic', color: colors.secondaryText }]}>Du har inte valt några fokusområden än.</Text>
            )}
          </View>
        </>
      ) : (
        <>
          <TextInput
            value={editedName}
            onChangeText={setEditedName}
            placeholder="Ditt namn"
            placeholderTextColor="#888"
            style={[local.input, { color: colors.primaryText }]}
          />
          <Text style={[local.subtext, { color: colors.secondaryText }]}>Välj dina fokusområden:</Text>
          <View style={local.interests}>
            {ALL_INTERESTS.map((interest) => (
              <TouchableOpacity
                key={interest}
                onPress={() => toggleInterest(interest)}
                style={[local.interestButton, editedInterests.includes(interest) && { backgroundColor: colors.cardBackground }]}
              >
                <Text
                  style={[local.interestText, editedInterests.includes(interest) && { fontWeight: 'bold', color: colors.primaryText }]}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <View style={local.actions}>
        <TouchableOpacity
          style={[local.button, { backgroundColor: '#DBBEC0' }]}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
        <Text style={local.buttonText}>
          {isEditing ? t('save_changes', 'Spara ändringar') : t('edit_profile', 'Redigera profil')}
        </Text>
        </TouchableOpacity>

        <View style={[global.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <Text style={global.cardText}>🌙 Mörkt läge</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
            thumbColor={theme === 'dark' ? '#fff' : '#888'}
            trackColor={{ false: '#ccc', true: colors.primaryText }}
          />
        </View>

        <View style={[global.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <Text style={global.cardText}>{language === 'sv' ? '🇸🇪 Svenska' : '🇺🇸 English'}</Text>
          <Switch
            value={language === 'en'}
            onValueChange={(value) => {
              const newLang = value ? 'en' : 'sv';
              changeLanguage(newLang);
            }}
            thumbColor={language === 'en' ? '#fff' : '#888'}
            trackColor={{ false: '#ccc', true: colors.primaryText }}
          />
        </View>

        <TouchableOpacity
          style={[local.button, { backgroundColor: '#DBBEC0' }]}
          onPress={handleLogout}
        >
          <Text style={local.buttonText}>{t('logout', 'Logga ut')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const local = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
  },
  icon: {
    marginTop: 40,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtext: {
    fontSize: 14,
    fontFamily: 'Lato',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Lato',
    marginBottom: 16,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  interestButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 4,
  },
  interestText: {
    fontFamily: 'Lato',
    color: '#555',
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
  },
  tagText: {
    fontFamily: 'Lato',
    fontSize: 14,
  },
});
