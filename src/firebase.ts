import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAVJMkAmVVaKfovipZ0BiceyKOtDQq4KO0',
  authDomain: 'rest-api-2dc66.firebaseapp.com',
  projectId: 'rest-api-2dc66',
  storageBucket: 'rest-api-2dc66.firebasestorage.app',
  messagingSenderId: '434214393336',
  appId: '1:434214393336:web:80727819e189627099b20d',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, signIn, signUp, logout };
