import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import Button from '../Button';

const Anonim = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[100px] items-center">
      <p className="text-2xl font-semibold text-blue-950 mb-6">
        {t('anonim.welcome')}
      </p>
      <div className="flex flex-row justify-between gap-10">
        <NavLink to="/signin">
          <Button
            className="min-w-28"
            size="md"
            variant="outlined"
            color="blue"
          >
            {t('signin')}
          </Button>
        </NavLink>
        <NavLink to="/signup">
          <Button size="md" variant="contained" color="blue">
            {t('signup')}
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Anonim;
