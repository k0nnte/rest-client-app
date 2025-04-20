import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import Logoutbtn from './Logoutbtn';
import Button from '../Button';

export default function Header() {
  const [user, setuser] = useState<User | null>(null);
  const { i18n, t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`
      sticky top-0 w-full flex justify-around items-center py-4
      transition-colors duration-300 z-50
      ${isScrolled ? 'bg-blue-600 text-white' : 'bg-transparent text-black'}
    `}
    >
      <NavLink to="/">
        <img
          width={50}
          src="https://www.opc-router.com/wp-content/uploads/2020/04/icon_rest_webservice_600x400px-400x267.png"
          alt="logo"
        />
      </NavLink>
      <div className="flex items-center gap-4">
        <select
          className="p-2 border-2 rounded-xl text-blue-950 border-blue-950 outline-blue-950 transition-all duration-300 ease-in-out focus:shadow-lg  hover:shadow-blue-600/30 bg-transparent"
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
              <Button
                className="min-w-28"
                size="sm"
                variant="outlined"
                color="blue"
              >
                {t('signin')}
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button
                className="min-w-28"
                size="sm"
                variant="contained"
                color="blue"
              >
                {t('signup')}
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}
