// Firebase setup + Firestore + auth + push
import { initializeApp } from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';


// 🔁 Din Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBj1gG1GNEeByY9klJB0YB14D5tZkMcNdg",
  authDomain: "fabulousfiveapp.firebaseapp.com",
  projectId: "fabulousfiveapp",
  storageBucket: "fabulousfiveapp.appspot.com",
  messagingSenderId: "575552397620",
  appId: "1:575552397620:web:57397740dbb43b6f154561",
  measurementId: "G-ZR3W2EQZVR"
  };

// Initiera Firebase-app
const app = initializeApp(firebaseConfig);

// ✅ Initiera Auth med AsyncStorage (viktigt för React Native)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);

// Feed
export const getFeed = async () => {
  const snapshot = await getDocs(collection(db, "feed"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Recept
export const getRecipes = async () => {
  const snapshot = await getDocs(collection(db, "recipes"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
