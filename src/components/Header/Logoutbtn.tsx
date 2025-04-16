import { getAuth, signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export default function Logoutbtn() {
  const aunt = getAuth();
  const nav = useNavigate();
  const { t } = useTranslation();

  const logout = async () => {
    try {
      await signOut(aunt);
      nav('/');
    } catch (error) {
      console.error('Error to log out: ', error);
    }
  };
  return <button onClick={logout}>{t('logout')}</button>;
}
