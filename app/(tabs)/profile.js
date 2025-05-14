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
  Pressable,
  Animated,
  Linking,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '@/LanguageContext';
import { useRouter, useNavigation } from 'expo-router';
import { signOutUser } from '@/services/auth';
import { useGlobalStyles } from '@/globalStyles';
import { useThemeContext } from '@/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { saveItem, getItem } from '@/services/storage';
import { saveUserProfile } from '@/services/firebase';
import { useUser } from '@/contexts/UserContext';
import { PanResponder } from 'react-native';

const ALL_INTERESTS = ['Träning', 'Kost', 'Stillhet', 'Sömn', 'Socialt'];

export const unstable_settings = {
  headerShown: true,
  headerTitleAlign: 'center',
};


export default function ProfileScreen() {
  const { t } = useTranslation();
  const { changeLanguage, language } = useLanguageContext();
  const router = useRouter();
  const { styles: global, colors } = useGlobalStyles();
  const { theme, setTheme } = useThemeContext();
  const user = useUser();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [birthyear, setBirthyear] = useState('');
  const [interests, setInterests] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedBirthyear, setEditedBirthyear] = useState('');
  const [editedInterests, setEditedInterests] = useState([]);

  const [settingsVisible, setSettingsVisible] = useState(false);
  const settingsAnim = useState(new Animated.Value(Dimensions.get('window').width))[0];

  const panResponder = PanResponder.create({
  onMoveShouldSetPanResponder: (_, gestureState) => {
    return gestureState.dx > 10;
  },
  onPanResponderMove: (_, gestureState) => {
    if (gestureState.dx > 30) {
      toggleSettings();
    }
  },
});

  useEffect(() => {
    const loadData = async () => {
      const storedName = await getItem('name');
      const storedInterests = await getItem('interests');
      const storedBirthyear = await getItem('birthyear');

      setName(storedName || '');
      setBirthyear(storedBirthyear || '');
      try {
        const parsed = storedInterests ? JSON.parse(storedInterests) : [];
        setInterests(parsed);
        setEditedInterests(parsed);
      } catch {
        setInterests([]);
        setEditedInterests([]);
      }

      setEditedName(storedName || '');
      setEditedBirthyear(storedBirthyear || '');
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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{
          fontFamily: 'LatoBold',
          fontSize: 18,
          color: colors.primaryText,
          textAlign: 'center',
          width: '100%',
        }}>
          {user?.name ? `Hej ${user.name}!` : ''}
        </Text>
      ),
      headerTitleAlign: 'center',
    });
  }, [user]);

  const handleSave = async () => {
    try {
      await saveItem('name', editedName);
      await saveItem('interests', JSON.stringify(editedInterests));
      await saveItem('birthyear', editedBirthyear);

      await saveUserProfile({
        name: editedName,
        interests: editedInterests,
        birthyear: editedBirthyear,
      });

      setName(editedName);
      setInterests(editedInterests);
      setBirthyear(editedBirthyear);
      setIsEditing(false);
    } catch (err) {
      Alert.alert('Fel', 'Kunde inte spara profiluppgifter.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.replace('/(auth)/login');
    } catch (err) {
      Alert.alert(t('logout_failed', 'Utloggning misslyckades'), err.message);
    }
  };

  const toggleSettings = () => {
    if (settingsVisible) {
      Animated.timing(settingsAnim, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSettingsVisible(false));
    } else {
      setSettingsVisible(true);
      Animated.timing(settingsAnim, {
        toValue: Dimensions.get('window').width / 2,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={local.container}
      >
        <Ionicons name="flower-outline" size={120} color={colors.primaryText} style={local.icon} />

        <Text style={[local.name, { color: colors.primaryText }]}>
          {user?.name || name || 'Ditt namn'}
        </Text>

        <Pressable onPress={toggleSettings} style={{ position: 'absolute', top: 40, right: 20 }}>
          <Ionicons name="settings-outline" size={28} color={colors.primaryText} />
        </Pressable>

        {!isEditing ? (
          <>
            <Text style={[local.subtext, { color: colors.secondaryText }]}>Födelseår:</Text>
            <Text style={[local.textValue, { color: colors.primaryText }]}>
              {birthyear || 'Ej angivet'}
            </Text>

            <Text style={[local.subtext, { color: colors.secondaryText }]}>Dina fokusområden:</Text>
            <View style={local.interests}>
              {interests.length > 0 ? (
                interests.map((interest) => (
                  <View key={interest} style={[local.tag, { backgroundColor: colors.cardBackground }]}>
                    <Text style={[local.tagText, { color: colors.primaryText }]}>{interest}</Text>
                  </View>
                ))
              ) : (
                <Text style={[local.subtext, { fontStyle: 'italic', color: colors.secondaryText }]}>
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
              placeholder="Ditt namn"
              placeholderTextColor="#888"
              style={[local.input, { color: colors.primaryText }]}
            />
            <TextInput
              value={editedBirthyear}
              onChangeText={setEditedBirthyear}
              placeholder="Födelseår"
              keyboardType="numeric"
              placeholderTextColor="#888"
              style={[local.input, { color: colors.primaryText }]}
            />
            <Text style={[local.subtext, { color: colors.secondaryText }]}>Välj dina fokusområden:</Text>
            <View style={local.interests}>
              {ALL_INTERESTS.map((interest) => (
                <TouchableOpacity
                  key={interest}
                  onPress={() => toggleInterest(interest)}
                  style={[
                    local.interestButton,
                    editedInterests.includes(interest) && { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Text
                    style={[
                      local.interestText,
                      editedInterests.includes(interest) && { fontWeight: 'bold', color: colors.primaryText },
                    ]}
                  >
                    {interest}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <TouchableOpacity
          style={[local.button, { backgroundColor: '#DBBEC0' }]}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={local.buttonText}>
            {isEditing ? 'Spara ändringar' : 'Redigera profil'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {settingsVisible && (
        <>
          <Pressable
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 98,
            }}
            onPress={toggleSettings}
          />
          <Animated.View
            {...panResponder.panHandlers}
            style={[local.settingsPanel, { left: settingsAnim, backgroundColor: colors.cardBackground }]}>
            <Text style={[local.settingsTitle, { color: colors.primaryText }]}>Inställningar</Text>

            <View style={local.settingsRow}>
              <Text style={[local.settingsText, { color: colors.primaryText }]}>☀️🌙Light/Dark</Text>
              <Switch
                value={theme === 'dark'}
                onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
                thumbColor={theme === 'dark' ? '#fff' : '#888'}
                trackColor={{ false: '#ccc', true: '#5D3E17' }}
              />
            </View>

            <View style={local.settingsRow}>
              <Text style={[local.settingsText, { color: colors.primaryText }]}>
                {language === 'sv' ? '🇸🇪 Svenska' : '🇺🇸 English'}
              </Text>
              <Switch
                value={language === 'en'}
                onValueChange={(value) => {
                  const newLang = value ? 'en' : 'sv';
                  changeLanguage(newLang);
                }}
                thumbColor={language === 'en' ? '#fff' : '#888'}
                trackColor={{ false: '#ccc', true: '#5D3E17' }}
              />
            </View>

            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:support@fabulousfive.se')}
              style={local.settingsRow}
            >
              <Ionicons name="mail-outline" size={20} color={colors.primaryText} />
              <Text style={[local.settingsText, { marginLeft: 10, color: colors.primaryText }]}>info@fabulousfive.se</Text>
            </TouchableOpacity>

            <View style={{ flex: 1 }} />

            <TouchableOpacity
              style={[local.button, { backgroundColor: '#DBBEC0', marginBottom: 20 }]}
              onPress={handleLogout}
            >
              <Text style={local.buttonText}>{t('logout', 'Logga ut')}</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </View>
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
    marginTop: 16,
    marginBottom: 4,
  },
  textValue: {
    fontSize: 16,
    fontFamily: 'Lato',
    marginBottom: 12,
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
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
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
  settingsPanel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '50%',
    padding: 20,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    zIndex: 99,
  },
  settingsTitle: {
    fontSize: 20,
    fontFamily: 'LatoBold',
    marginBottom: 24,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingsText: {
    fontSize: 16,
    fontFamily: 'Lato',
  },
});
