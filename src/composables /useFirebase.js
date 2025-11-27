import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxVleLyPiShmn-9AZudj4Nc8etyibfmdg",
  authDomain: "tomizbase.firebaseapp.com",
  projectId: "tomizbase",
  storageBucket: "tomizbase.firebasestorage.app",
  messagingSenderId: "567427420762",
  appId: "1:567427420762:web:c94cbb9fce407ce911be63",
};

export async function useFirebase() {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  await new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) await signInAnonymously(auth);
      unsub();
      resolve();
    });
  });

  return { db, auth };
}
