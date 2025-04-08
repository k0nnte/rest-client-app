import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';

export default function Logoutbtn() {
  const aunt = getAuth();
  const nav = useNavigate();
  const logout = async () => {
    try {
      await signOut(aunt);
      nav('/');
    } catch (error) {
      console.error('ошибка выхода', error);
    }
  };
  return <button onClick={logout}>logout</button>;
}
