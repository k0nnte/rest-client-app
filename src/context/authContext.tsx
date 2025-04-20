import { createContext } from 'react';

export type AuthUser = {
  email: string | null;
  uid: string;
};

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
