import { NavLink } from 'react-router';
import './Anonim.scss';
import { useTranslation } from 'react-i18next';

const Anonim = () => {
  const { t } = useTranslation();

  return (
    <div className="wrapper_anon_main">
      <p>{t('anonim.welcome')}</p>
      <div className="btn_wrapper">
        <NavLink to="/signin">
          <button>{t('signin')}</button>
        </NavLink>
        <NavLink to="/signup">
          <button>{t('signup')}</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Anonim;
