import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { format } from 'date-fns';
import { db } from '@/services/firebase';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import { useUser } from '@/contexts/UserContext';
import { useGlobalStyles } from '@/globalStyles';

export default function HappinessCalendar() {
  const user = useUser();
  const { colors } = useGlobalStyles();
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [editAnswer, setEditAnswer] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    const loadAnswers = async () => {
      if (!user?.uid) return;

      const snapshot = await getDocs(
        collection(db, 'reflections', user.uid, 'answers')
      );
      const days = snapshot.docs.map((doc) => doc.id);
      setMarkedDates(days);
    };

    loadAnswers();
  }, [user]);

  const handleDateChange = async (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setSelectedDate(dateStr);

    const answerRef = doc(db, 'reflections', user.uid, 'answers', dateStr);
    const questionRef = doc(db, 'questions', dateStr);

    const [answerSnap, questionSnap] = await Promise.all([
      getDoc(answerRef),
      getDoc(questionRef),
    ]);

    if (questionSnap.exists()) {
      setQuestion(questionSnap.data()?.question || '');
    } else {
      setQuestion('');
    }

    if (answerSnap.exists()) {
      const text = answerSnap.data()?.text || '';
      setSelectedAnswer(text);
      setEditAnswer(text);
      setModalVisible(true);
    } else {
      setSelectedAnswer(null);
      setEditAnswer('');
    }
  };

  const handleSave = async () => {
    const ref = doc(db, 'reflections', user.uid, 'answers', selectedDate);
    await setDoc(
      ref,
      {
        text: editAnswer.trim(),
        date: selectedDate,
        uid: user.uid,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    if (!markedDates.includes(selectedDate)) {
      setMarkedDates((prev) => [...prev, selectedDate]);
    }
    setModalVisible(false);
  };

  const handleDelete = async () => {
    Alert.alert(
      'Ta bort reflektion',
      'Är du säker på att du vill ta bort denna reflektion?',
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Ta bort',
          style: 'destructive',
          onPress: async () => {
            const ref = doc(db, 'reflections', user.uid, 'answers', selectedDate);
            await deleteDoc(ref);
            setMarkedDates((prev) => prev.filter((d) => d !== selectedDate));
            setModalVisible(false);
          },
        },
      ]
    );
  };

  return (
    <View style={{ marginTop: 32, marginHorizontal: 24 }}>
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'LatoBold',
          marginBottom: 8,
          color: colors.primaryText,
        }}
      >
        Tidigare reflektioner
      </Text>
      <CalendarPicker
        onDateChange={handleDateChange}
        todayBackgroundColor={colors.primaryText}
        selectedDayColor={colors.secondaryText}
        selectedDayTextColor="#fff"
        textStyle={{ color: colors.primaryText }}
        customDatesStyles={(date) => {
          const formatted = format(date, 'yyyy-MM-dd');
          if (markedDates.includes(formatted)) {
            return {
              style: { backgroundColor: '#4CAF50', borderRadius: 100 },
              textStyle: { color: '#fff' },
            };
          }
          return {};
        }}
      />

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={local.modalOverlay}>
          <View style={[local.modalContent, { backgroundColor: colors.cardBackground }]}>
            <Text style={[local.modalTitle, { color: colors.primaryText }]}>
              {selectedDate}
            </Text>

            {!!question && (
              <Text style={[local.modalQuestion, { color: colors.secondaryText }]}>
                {question}
              </Text>
            )}

            <TextInput
              multiline
              value={editAnswer}
              onChangeText={setEditAnswer}
              placeholder="Skriv din reflektion"
              placeholderTextColor={colors.secondaryText}
              style={[
                local.modalInput,
                { color: colors.primaryText, borderColor: colors.secondaryText },
              ]}
            />
            <TouchableOpacity
              onPress={handleSave}
              style={[local.modalButton, { backgroundColor: colors.primaryText }]}
            >
              <Text style={local.modalButtonText}>Spara ändring</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              style={[local.modalDelete, { borderColor: '#e74c3c' }]}
            >
              <Text style={{ color: '#e74c3c' }}>Ta bort reflektion</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={local.modalClose}>
              <Text style={{ color: colors.primaryText }}>Stäng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const local = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'LatoBold',
    marginBottom: 8,
  },
  modalQuestion: {
    fontSize: 16,
    fontFamily: 'LatoItalic',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  modalInput: {
    height: 100,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontFamily: 'Lato',
    fontSize: 16,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  modalButton: {
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: 'LatoBold',
    color: '#fff',
  },
  modalDelete: {
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 12,
  },
  modalClose: {
    alignSelf: 'center',
    marginTop: 6,
  },
});
