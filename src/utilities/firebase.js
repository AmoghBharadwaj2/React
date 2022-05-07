// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl7ymqm7rtAJf2WH0QIadUtP0zHp_vfio",
  authDomain: "react-58cba.firebaseapp.com",
  databaseURL: "https://react-58cba-default-rtdb.firebaseio.com",
  projectId: "react-58cba",
  storageBucket: "react-58cba.appspot.com",
  messagingSenderId: "529144937043",
  appId: "1:529144937043:web:b0baa52c9ea8b5ea27e4a6",
  measurementId: "G-9Y228KLXRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(app), new GoogleAuthProvider());
  };

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
  );