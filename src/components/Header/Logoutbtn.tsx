import { getAuth, signOut } from 'firebase/auth';

export default function Logoutbtn() {
  const aunt = getAuth();

  const logout = async () => {
    try {
      await signOut(aunt);
    } catch (error) {
      console.error('ошибка выхода', error);
    }
  };
  return <button onClick={logout}>logout</button>;
}
