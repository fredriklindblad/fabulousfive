import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { signOutUser } from '@/services/auth';
import { GlobalColors } from '@/globalStyles';
import { Ionicons } from '@expo/vector-icons';

const ALL_INTERESTS = ['Träning', 'Kost', 'Stillhet', 'Sömn', 'Socialt'];

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const [name, setName] = useState('');
  const [interests, setInterests] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedInterests, setEditedInterests] = useState([]);

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

  const toggleLanguage = async () => {
    const newLang = i18n.language === 'sv' ? 'en' : 'sv';
    await i18n.changeLanguage(newLang);
    await AsyncStorage.setItem('lang', newLang);
  };

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
      style={{ flex: 1, backgroundColor: GlobalColors.background }}
      contentContainerStyle={[styles.container, { backgroundColor: GlobalColors.background }]}>
      <Ionicons name="flower-outline" size={120} color={GlobalColors.primaryText} style={styles.icon} />
      
      <Text style={styles.name}>{name || 'Ditt namn'}</Text>

      {!isEditing ? (
        <>
          <Text style={styles.subtext}>Dina fokusområden:</Text>
          <View style={styles.interests}>
            {interests.length > 0 ? interests.map((interest) => (
              <View key={interest} style={styles.tag}>
                <Text style={styles.tagText}>{interest}</Text>
              </View>
            )) : (
              <Text style={[styles.subtext, { fontStyle: 'italic' }]}>
                Du har inte valt några fokusområden än.
              </Text>
            )}
          </View>
        </>
      ) : (
        <>
          <TextInput
            value={editedName}
            onChangeText={setEditedName}
            style={styles.input}
            placeholder="Ditt namn"
          />
          <Text style={styles.subtext}>Välj dina fokusområden:</Text>
          <View style={styles.interests}>
            {ALL_INTERESTS.map((interest) => (
              <TouchableOpacity
                key={interest}
                onPress={() => toggleInterest(interest)}
                style={[
                  styles.interestButton,
                  editedInterests.includes(interest) && styles.interestSelected,
                ]}
              >
                <Text
                  style={[
                    styles.interestText,
                    editedInterests.includes(interest) && styles.interestTextSelected,
                  ]}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Spara ändringar' : 'Redigera profil'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
          <Text style={styles.buttonText}>{t('change_language', 'Byt språk')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>{t('logout', 'Logga ut')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalColors.background,
  },
  icon: {
    marginTop: 40,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    color: GlobalColors.primaryText,
    marginBottom: 4,
  },
  subtext: {
    fontSize: 14,
    color: GlobalColors.secondaryText,
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
  interestSelected: {
    backgroundColor: '#cde5d7',
  },
  interestText: {
    color: '#555',
    fontWeight: '500',
  },
  interestTextSelected: {
    color: '#2b5a3c',
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  button: {
    backgroundColor: GlobalColors.primaryText,
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
    backgroundColor: GlobalColors.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
  },
  tagText: {
    fontFamily: 'Lato',
    fontSize: 14,
    color: GlobalColors.primaryText,
  },
  scrollContainer: {
    flex: 1,
  },
});
