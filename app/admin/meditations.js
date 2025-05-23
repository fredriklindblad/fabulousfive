import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert
} from 'react-native';
import { useGlobalStyles } from '@/globalStyles';
import { db } from '@/services/firebase';
import { auth } from 'firebase/auth';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import meditationsData from '@/assets/data/meditations.json';

export default function AdminMeditationsScreen() {
  const { colors } = useGlobalStyles();
  const [meditations, setMeditations] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const user = auth().currentUser;
    if (!user || user.email !== 'fredrik-lindblad@hotmail.com') {
      setUnauthorized(true);
      return;
    }
    loadMeditations();
  }, []);

  const loadMeditations = async () => {
    const snapshot = await getDocs(collection(db, 'meditations'));
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMeditations(list);
  };

  const handleSave = async () => {
    if (!title || !description) return Alert.alert('Fyll i titel och beskrivning');
    const id = title.toLowerCase().replace(/\s/g, '-');
    await setDoc(doc(db, 'meditations', id), {
      title,
      description,
      createdAt: new Date().toISOString(),
    });
    Alert.alert('✅ Meditation sparad!');
    setTitle('');
    setDescription('');
    loadMeditations();
  };

  const handleImport = async () => {
    try {
      for (const meditation of meditationsData) {
        if (!meditation.id || !meditation.title) continue;
        await setDoc(doc(db, 'meditations', meditation.id), meditation);
      }
      Alert.alert('✅ Import från JSON klar!');
      loadMeditations();
    } catch (err) {
      Alert.alert('Fel vid import', err.message);
    }
  };

  if (unauthorized) {
    return <View style={styles.center}><Text style={{ color: 'red' }}>⛔ Åtkomst nekad</Text></View>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primaryText }]}>Meditationer</Text>

      <TextInput
        placeholder="Titel"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { color: colors.primaryText }]}
        placeholderTextColor={colors.secondaryText}
      />
      <TextInput
        placeholder="Kort beskrivning"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { color: colors.primaryText }]}
        placeholderTextColor={colors.secondaryText}
      />

      <TouchableOpacity onPress={handleSave} style={[styles.button, { backgroundColor: colors.primaryText }]}>
        <Text style={styles.buttonText}>Spara meditation</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleImport} style={[styles.button, { backgroundColor: '#4CAF50' }]}>
        <Text style={styles.buttonText}>Importera från JSON</Text>
      </TouchableOpacity>

      <FlatList
        data={meditations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            <Text style={{ fontFamily: 'LatoBold', color: colors.primaryText }}>{item.title}</Text>
            <Text style={{ color: colors.secondaryText }}>{item.shortdescription}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'LatoBold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    fontFamily: 'Lato',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
});
