import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function MainPage() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div>{t('hi')}</div>
      <button onClick={() => i18n.changeLanguage('ru')}>RU</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/client">Rest API client</NavLink>
    </>
  );
}
