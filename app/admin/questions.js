import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import { useGlobalStyles } from '@/globalStyles';
import { auth, db } from '@/services/firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import { Asset } from 'expo-asset';

export default function AdminQuestionsScreen() {
  const { colors } = useGlobalStyles();
  const [questions, setQuestions] = useState([]);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user || user.email !== 'fredrik-lindblad@hotmail.com') {
      setUnauthorized(true);
      return;
    }

    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    const snapshot = await getDocs(collection(db, 'questions'));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const sorted = data.sort((a, b) => a.id.localeCompare(b.id));
    setQuestions(sorted);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!date || !question) return Alert.alert('Fyll i båda fälten');
    try {
      await setDoc(doc(db, 'questions', date), { question });
      Alert.alert('✅ Sparat!');
      setDate(format(new Date(), 'yyyy-MM-dd'));
      setQuestion('');
      loadQuestions();
    } catch (err) {
      Alert.alert('Fel vid sparning', err.message);
    }
  };

  const importQuestionsFromCSV = async () => {
    try {
      const asset = Asset.fromModule(require('@/assets/data/questions.csv'));
      await asset.downloadAsync();
      const csvText = await FileSystem.readAsStringAsync(asset.localUri);
      const parsed = Papa.parse(csvText, { header: true });

      for (const row of parsed.data) {
        if (!row.date || !row.question) continue;
        const ref = doc(db, 'questions', row.date);
        await setDoc(ref, { question: row.question });
      }

      Alert.alert('✅ Import klar!');
      loadQuestions();
    } catch (err) {
      Alert.alert('Fel vid import', err.message);
    }
  };

  if (unauthorized) {
    return (
      <View style={local.center}>
        <Text style={{ color: 'red' }}>⛔ Åtkomst nekad</Text>
      </View>
    );
  }

  return (
    <View style={[local.container, { backgroundColor: colors.background }]}>
      <Text style={[local.title, { color: colors.primaryText }]}>
        Reflektionsfrågor
      </Text>

      <TextInput
        placeholder="yyyy-MM-dd"
        value={date}
        onChangeText={setDate}
        style={[local.input, { color: colors.primaryText }]}
        placeholderTextColor={colors.secondaryText}
      />
      <TextInput
        placeholder="Fråga"
        value={question}
        onChangeText={setQuestion}
        style={[local.input, { color: colors.primaryText }]}
        placeholderTextColor={colors.secondaryText}
      />

      <TouchableOpacity
        onPress={handleSave}
        style={[local.button, { backgroundColor: colors.primaryText }]}
      >
        <Text style={local.buttonText}>Spara</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={importQuestionsFromCSV}
        style={[local.button, { backgroundColor: '#4CAF50' }]}
      >
        <Text style={local.buttonText}>Importera från CSV</Text>
      </TouchableOpacity>

      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[local.card, { backgroundColor: colors.cardBackground }]}>
            <Text style={{ fontFamily: 'LatoBold', color: colors.primaryText }}>{item.id}</Text>
            <Text style={{ color: colors.secondaryText }}>{item.question}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const local = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
