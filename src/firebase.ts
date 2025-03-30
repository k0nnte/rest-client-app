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
  } catch {
    throw new Error("Can't find a User with this email and password");
  }
};

const signUp = async (email: string, password: string) => {
  let newUser;
  try {
    newUser = await createUserWithEmailAndPassword(auth, email, password);
  } catch {
    throw new Error('A User with this email is already registered');
  }
  return newUser.user;
};

const logout = () => {
  signOut(auth);
};

export { auth, signIn, signUp, logout };
