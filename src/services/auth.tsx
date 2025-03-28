import { auth } from '../firebase';

export const isAuth = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(!!user);
    });
  });
};
