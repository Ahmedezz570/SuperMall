import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          const userData = {
            email: user.email,
            uid: user.uid,
            isAdmin: userSnap.exists() ? userSnap.data().isAdmin : false
          };

          setUser(userData);
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
        } catch (error) {
          console.error("❌ Error fetching user data:", error.message);
        }
      } else {
        setUser(null);
        await AsyncStorage.removeItem('userData');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("❌ Logout Error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
