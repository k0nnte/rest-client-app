import { onAuthStateChanged, User } from 'firebase/auth';
import AuthContext, { AuthUser } from './authContext';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(
        user
          ? {
              email: user.email,
              uid: user.uid,
            }
          : null
      );
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
