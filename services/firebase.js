// Firebase setup + Firestore + auth + push
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  browserLocalPersistence,
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

// 🔁 Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBj1gG1GNEeByY9klJB0YB14D5tZkMcNdg",
  authDomain: "fabulousfiveapp.firebaseapp.com",
  projectId: "fabulousfiveapp",
  storageBucket: "fabulousfiveapp.appspot.com",
  messagingSenderId: "575552397620",
  appId: "1:575552397620:web:57397740dbb43b6f154561",
  measurementId: "G-ZR3W2EQZVR"
};

// 🔥 Init Firebase
const app = initializeApp(firebaseConfig);

// 📱 Mobil eller 🌐 Web – rätt auth beroende på plattform
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// 🔗 Exportera Firestore och Storage
const db = getFirestore(app);
const storage = getStorage(app);

// 📥 Firestore queries
export const getFeed = async () => {
  const snapshot = await getDocs(collection(db, 'feed'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getRecipes = async () => {
  const snapshot = await getDocs(collection(db, 'recipes'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveUserProfile = async (profileData) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Ingen användare inloggad');

  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    ...profileData,
    uid: user.uid,
    email: user.email,
    createdAt: new Date().toISOString()
  });
};

export { auth, db, storage };
