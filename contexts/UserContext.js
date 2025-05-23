import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/services/firebase';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const updateUserData = async () => {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return;

    const ref = doc(db, 'users', firebaseUser.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      setUserData({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        ...snap.data(),
      });
    } else {
      setUserData({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await updateUserData();
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ ...userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
