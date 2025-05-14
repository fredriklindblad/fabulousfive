import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const ref = doc(db, 'users', firebaseUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUserData({ uid: firebaseUser.uid, email: firebaseUser.email, ...snap.data() });
        } else {
          setUserData({ uid: firebaseUser.uid, email: firebaseUser.email });
        }
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
