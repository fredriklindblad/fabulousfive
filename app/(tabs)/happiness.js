import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, Dimensions, View } from 'react-native';
import { useGlobalStyles } from '@/globalStyles';
import PhilosophyBox from '@/components/PhilosophyBox';
import HappinessQuestionBox from '@/components/HappinessQuestionBox';
import HappinessCalendar from '@/components/HappinessCalendar';
import ReflectionSuccessPopup from '@/components/ReflectionSuccessPopup';
import { getDailyQuestion } from '@/services/happiness';

export default function HappinessScreen() {
  const { colors } = useGlobalStyles();
  const [question, setQuestion] = useState(null);
  const [reloadCalendar, setReloadCalendar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      const q = await getDailyQuestion();
      setQuestion(q);
    };
    fetchQuestion();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Filosofirutan – svävande */}
        <PhilosophyBox
          title="Vår filosofi"
          text="Vi tror på stillhet som ett sätt att återknyta till oss själva. Genom meditation, reflektion och närvaro kan vi skapa balans och lugn i vardagen."
        />

      {/* Belönings-popup */}
      <ReflectionSuccessPopup
        visible={showPopup}
        onFinish={() => setShowPopup(false)}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={local.container}
        keyboardShouldPersistTaps="handled"
      >
        {question && (
          <>
            <Text style={[local.title, { color: colors.primaryText }]}>
              Dagens reflektionsfråga
            </Text>
            <HappinessQuestionBox
              question={question}
              onSaved={() => {
                setReloadCalendar((prev) => !prev);
                setShowPopup(true);
              }}
            />
          </>
        )}

        <HappinessCalendar key={reloadCalendar} />
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const local = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 64,
    paddingTop: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'LatoBold',
    marginBottom: 0,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});
