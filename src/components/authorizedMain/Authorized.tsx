import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import Button from '../Button';

interface IAuthorized {
  name: string;
}

export default function Authorized({ name }: IAuthorized) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[100px] ">
      <h2 className="text-2xl font-semibold text-blue-950 mb-6">
        {t('authorized.welcome')}, {name}
      </h2>

      <div className="flex flex-row justify-between ">
        <NavLink to="/rest">
          <Button size="md" variant="contained" color="blue">
            {t('authorized.rest')}
          </Button>
        </NavLink>
        <NavLink to="/history">
          <Button size="md" variant="contained" color="blue">
            {t('authorized.history')}{' '}
          </Button>
        </NavLink>
        <NavLink to="/variables">
          <Button size="md" variant="contained" color="blue">
            {t('authorized.variables')}{' '}
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
