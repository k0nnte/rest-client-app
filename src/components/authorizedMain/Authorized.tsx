import { NavLink } from 'react-router';
import './Authorized.scss';
import { useTranslation } from 'react-i18next';

interface IAuthorized {
  name: string;
}

export default function Authorized({ name }: IAuthorized) {
  const { t } = useTranslation();

  return (
    <div className="wrapper_main">
      <p className="main_paragraph">
        {t('authorized.welcome')}, {name}
      </p>

      <div className="wrapper_btn">
        <NavLink to="/rest">
          <button>{t('authorized.rest')}</button>
        </NavLink>
        <NavLink to="/history">
          <button>{t('authorized.history')}</button>
        </NavLink>
        <NavLink to="/variables">
          <button>{t('authorized.variables')}</button>
        </NavLink>
      </div>
    </div>
  );
}
