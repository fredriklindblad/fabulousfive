import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useGlobalStyles } from '@/globalStyles';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { getItem, saveItem } from '@/services/storage';
import { saveUserProfile, uploadProfileImage } from '@/services/firebase';
import { Picker } from '@react-native-picker/picker';
import { YEARS } from '@/constants/onboardingData';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from '@/components/Toast';


export default function EditProfileScreen() {
  const { colors } = useGlobalStyles();
  const router = useRouter();
  const user = useUser();
  const { updateUserData } = useUser();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [birthyear, setBirthyear] = useState('');
  const [interests, setInterests] = useState([]);
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (user) {
        setName(user.name || '');
        setBirthyear(user.birthyear || '');
        setInterests(user.interests || []);
        setProfileImage(user.image || null);
        setEmail(user.email || '');
    }
  }, [user]);

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await saveItem('profileImage', uri);
    }
  };

const handleSave = async () => {
  try {
    let imageUrl = profileImage;

    // Om bilden är en lokal fil (dvs inte redan en https-url), ladda upp till Firebase
    if (profileImage && !profileImage.startsWith('https')) {
      imageUrl = await uploadProfileImage(profileImage, user.uid);
    }

    await saveUserProfile({
      name: name || '',
      birthyear: birthyear || '',
      interests: interests || [],
      image: imageUrl,
      lang: user?.lang || 'sv',
      theme: user?.theme || 'light',
      onboardingDone: true,
    });

    if (user?.updateUserData) {
      await user.updateUserData(); // detta måste stämma med vad som definieras i UserContext
    }

    showToast('Din profil har uppdaterats!');
    router.back();
  } catch (err) {
    console.error('🔥 Profilfel:', err.message);
    Alert.alert('Fel', 'Kunde inte spara profilen.');
  }
};

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Pressable
        onPress={() => router.back()}
        style={{
          position: 'absolute',
          top: 40,
          right: 20,
          zIndex: 10,
          backgroundColor: colors.cardBackground,
          padding: 8,
          borderRadius: 30,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
        }}
      >
        <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
      </Pressable>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={[styles.title, { color: colors.primaryText }]}>Redigera profil</Text>

        <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center', marginBottom: 16 }}>
          <Image
            source={profileImage ? { uri: profileImage } : require('@/assets/default-avatar.png')}
            style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#ccc' }}
          />
          <Text style={{ color: colors.linkText, marginTop: 8 }}>Byt profilbild</Text>
        </TouchableOpacity>

        <Text style={[styles.label, { color: colors.primaryText }]}>Ditt namn</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Namn"
          placeholderTextColor="#888"
          style={[styles.input, { color: colors.primaryText }]}
        />

        <Text style={[styles.label, { color: colors.primaryText }]}>Födelseår</Text>
        <View style={[styles.pickerWrapper, { backgroundColor: colors.cardBackground }]}>
            <Picker
            selectedValue={birthyear}
            onValueChange={(val) => setBirthyear(val)}
            style={[styles.picker, { color: colors.primaryText }]} // 💡 färg synlig mot bakgrund
            dropdownIconColor={colors.primaryText} // gäller för Android
            itemStyle={{
                color: colors.primaryText,
                fontSize: 18,
                fontFamily: 'Lato',
            }}
            >
            {YEARS.map((year) => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>

        <Text style={[styles.label, { color: colors.primaryText }]}>Fokusområden</Text>
        <View style={styles.interestsWrap}>
          {['Träning', 'Kost', 'Stillhet', 'Sömn', 'Socialt'].map((i) => (
            <TouchableOpacity
              key={i}
              onPress={() => toggleInterest(i)}
              style={[styles.tag, {
                backgroundColor: interests.includes(i) ? colors.cardBackground : '#eee',
              }]}
            >
              <Text style={{
                color: interests.includes(i) ? colors.primaryText : '#555',
                fontWeight: interests.includes(i) ? 'bold' : 'normal',
                fontFamily: 'Lato',
              }}>
                {i}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: colors.primaryText }]}>E-postadress</Text>
        <Text style={[styles.input, { color: colors.primaryText }]}>
        {email}
        </Text>
    
        <Text style={[styles.label, { color: colors.primaryText }]}>Lösenord</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Nytt lösenord"
          placeholderTextColor="#888"
          secureTextEntry
          style={[styles.input, { color: colors.primaryText }]}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primaryText }]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Spara</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'LatoBold',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontFamily: 'LatoBold',
    fontSize: 16,
    marginBottom: 8,
  },
  text: {
    fontFamily: 'Lato',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontFamily: 'Lato',
  },
  pickerWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
    marginBottom: 24,
  },
  picker: {
    width: '100%',
    height: '100%',
  },
  interestsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 8,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'LatoBold',
  },
});
