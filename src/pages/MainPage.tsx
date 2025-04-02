import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function MainPage() {
  const { t } = useTranslation();

  return (
    <>
      <div>{t('hi')}</div>
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/client">Rest API client</NavLink>
    </>
  );
}
