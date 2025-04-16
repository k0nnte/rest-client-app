import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import Logoutbtn from './Logoutbtn';
import './Header.scss';

export default function Header() {
  const [user, setuser] = useState<User | null>(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const aunt = getAuth();
    const sub = onAuthStateChanged(aunt, setuser);
    return () => sub();
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  console.log(i18n.language);

  return (
    <header className="header">
      <NavLink to="/">
        <img src="/" alt="logo" />
      </NavLink>
      <div className="button_wrapper">
        <select
          value={i18n.language.split('-')[0]}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>

        {user ? (
          <Logoutbtn />
        ) : (
          <>
            <NavLink to="/signin">
              <button className="btn">{t('signin')}</button>
            </NavLink>
            <NavLink to="/signup">
              <button className="btn">{t('signup')}</button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}
