import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc
} from 'firebase/firestore';

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

// 🔐 Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBj1gG1GNEeByY9klJB0YB14D5tZkMcNdg",
  authDomain: "fabulousfiveapp.firebaseapp.com",
  projectId: "fabulousfiveapp",
  storageBucket: "fabulousfiveapp.appspot.com",
  messagingSenderId: "575552397620",
  appId: "1:575552397620:web:57397740dbb43b6f154561",
  measurementId: "G-ZR3W2EQZVR"
};

// ✅ Initiera bara om det inte redan finns appar (viktigt vid hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 📱 Mobil vs Web – auth init
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    auth = getAuth(app);
  }
}

// 🔥 Databas + Storage
const db = getFirestore(app);
const storage = getStorage(app);

// 🔎 Queries
export const getMove = async () => {
  const snapshot = await getDocs(collection(db, 'move'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getRecipes = async () => {
  const snapshot = await getDocs(collection(db, 'recipes'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveUserProfile = async ({ name, lang, theme, birthyear, interests }) => {
  const user = getAuth().currentUser;
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    name,
    email: user.email,
    lang,
    theme,
    birthyear,
    interests,
    createdAt: new Date().toISOString(),
  });
};

export const fetchAllUsers = async () => {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export { auth, db, storage };
