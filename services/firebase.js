import * as FileSystem from 'expo-file-system';
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
  setDoc,
} from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

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

// ✅ Initiera appen en gång
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 📱 Auth initiering – web eller mobil (Expo Go-safe)
let auth;
try {
  if (Platform.OS === 'web') {
    auth = getAuth(app);
  } else {
    const isExpoGo = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
    if (isExpoGo) {
      console.log('Expo Go: fallback till getAuth()');
      auth = getAuth(app);
    } else {
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
    }
  }
} catch (err) {
  console.log('Fallback to getAuth:', err.message);
  auth = getAuth(app);
}

// 🔥 Databas och Storage
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

export const getMeditations = async () => {
  const snapshot = await getDocs(collection(db, 'meditations'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveUserProfile = async ({
  name = '',
  lang = 'sv',
  theme = 'light',
  birthyear = '',
  interests = [],
  onboardingDone = true,
  image = '',
}) => {
  const user = auth.currentUser;
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
    image,
    onboardingDone,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
};

export const getUserProfile = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

export const fetchAllUsers = async () => {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const uploadProfileImage = async (uri, uid) => {
  if (!uri || !uid) return '';

  try {
    const imageRef = ref(storage, `profileImages/${uid}.jpg`);

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const byteArray = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

    await uploadBytes(imageRef, byteArray, {
      contentType: 'image/jpeg',
    });

    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (err) {
    console.error('🔥 FEL VID UPPLADDNING:', err);
    throw err;
  }
};

export { auth, db, storage };
