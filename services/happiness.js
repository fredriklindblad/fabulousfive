import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { format } from 'date-fns';

/**
 * Hämtar dagens reflektionsfråga från Firestore (kollektionen "questions").
 * Dokument-ID ska vara i formatet "yyyy-MM-dd", t.ex. "2025-05-21".
 */
export const getDailyQuestion = async () => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const ref = doc(db, 'questions', today);

  try {
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data().question;
    }
  } catch (error) {
    console.warn('❌ Kunde inte hämta frågan:', error.message);
  }

  return 'Vad vill du reflektera över idag?';
};
