import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(() => {
      // Ignore persistence setup errors and continue with default auth behavior.
    });

    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      loginWithEmail: (email, password) => signInWithEmailAndPassword(auth, email, password),
      registerWithEmail: (email, password) => createUserWithEmailAndPassword(auth, email, password),
      loginWithGoogle: async () => {
        try {
          return await signInWithPopup(auth, googleProvider);
        } catch (error) {
          const popupFallbackCodes = new Set([
            "auth/popup-blocked",
            "auth/cancelled-popup-request",
            "auth/operation-not-supported-in-this-environment"
          ]);

          if (popupFallbackCodes.has(error?.code)) {
            await signInWithRedirect(auth, googleProvider);
            return null;
          }

          throw error;
        }
      },
      logout: () => signOut(auth)
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
