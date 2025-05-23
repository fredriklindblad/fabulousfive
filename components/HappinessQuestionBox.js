import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useGlobalStyles } from '@/globalStyles';
import { db } from '@/services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useUser } from '@/contexts/UserContext';
import { format } from 'date-fns';

export default function HappinessQuestionBox({ question, onSaved }) {
  const { colors } = useGlobalStyles();
  const user = useUser();
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    const load = async () => {
      if (!user?.uid) return;

      const ref = doc(db, 'reflections', user.uid, 'answers', today);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setAnswer(snapshot.data()?.text || '');
        setSaved(true);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const save = async () => {
    if (!user?.uid || answer.trim() === '') return;

    const ref = doc(db, 'reflections', user.uid, 'answers', today);
    await setDoc(ref, {
      text: answer.trim(),
      date: today,
      uid: user.uid,
      question: question,
      updatedAt: new Date().toISOString(),
    });

    setSaved(true);
    onSaved?.(); // 🟢 Meddela parent (t.ex. för popup)
  };

  if (loading) {
    return <ActivityIndicator style={{ marginVertical: 40 }} />;
  }

  return (
    <View style={[local.wrapper, { backgroundColor: colors.cardBackground }]}>
      <Text style={[local.question, { color: colors.primaryText }]}>{question}</Text>
      <TextInput
        multiline
        placeholder="Skriv ditt svar här..."
        placeholderTextColor={colors.secondaryText}
        value={answer}
        onChangeText={(text) => {
          setAnswer(text);
          setSaved(false);
        }}
        style={[
          local.input,
          {
            color: colors.primaryText,
            borderColor: colors.secondaryText,
          },
        ]}
      />
      <TouchableOpacity
        onPress={save}
        disabled={answer.trim() === ''}
        style={[
          local.button,
          { backgroundColor: saved ? '#aaa' : colors.primaryText },
        ]}
      >
        <Text style={local.buttonText}>{saved ? 'Uppdatera' : 'Spara'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const local = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    marginHorizontal: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontFamily: 'LatoBold',
    marginBottom: 12,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontFamily: 'Lato',
    fontSize: 16,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'LatoBold',
    color: '#fff',
  },
});
