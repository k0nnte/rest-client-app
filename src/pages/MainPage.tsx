import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Authorized from '../components/authorizedMain/authorized';
import Anonim from '../components/anonim/Anonim';

export default function MainPage() {
  const [user, setuser] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setuser(u.email);
      } else {
        setuser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="main">{user ? <Authorized name={user} /> : <Anonim />}</div>
  );
}
