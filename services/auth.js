// Inloggnings- och registreringsfunktioner
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

export const registerUser = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };  

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = () =>
  signOut(auth);
