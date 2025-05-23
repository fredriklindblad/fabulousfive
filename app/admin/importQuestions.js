import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import { db } from '@/services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

export const importQuestionsFromCSV = async () => {
  try {
    // 👇 Bygg absolut path till fil i projektet
    const path = FileSystem.documentDirectory + 'questions.csv';

    // 👇 Kopiera från bundle till dokumentkatalog om inte redan där
    const bundledUri = require('../../assets/data/questions.csv');
    await FileSystem.downloadAsync(bundledUri, path);

    const csvText = await FileSystem.readAsStringAsync(path);
    const parsed = Papa.parse(csvText, { header: true });

    for (const row of parsed.data) {
      if (!row.date || !row.question) continue;
      const ref = doc(db, 'questions', row.date);
      await setDoc(ref, { question: row.question });
    }

    Alert.alert('✅ Import klar!');
  } catch (err) {
    console.error('Importfel:', err);
    Alert.alert('Fel vid import', err.message);
  }
};
