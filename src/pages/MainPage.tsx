import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import Authorized from '../components/authorizedMain/authorized';
import Anonim from '../components/anonim/Anonim';

export default function MainPage() {
  const [user, setuser] = useState<string | null>(null);
  const aunt = getAuth();
  onAuthStateChanged(aunt, (u) => {
    if (u) {
      setuser(u.email);
    } else {
      setuser(null);
    }
  });

  return (
    <div className="main">{user ? <Authorized name={user} /> : <Anonim />}</div>
  );
}
