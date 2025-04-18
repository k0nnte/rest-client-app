import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { signIn, signUp } from '../firebase';
import { sendEmailVerification } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import Button from './Button';

type AuthInputs = {
  email: string;
  password: string;
};

export default function AuthForm(props: { authType: string }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t('auth.emailRequired'))
      .email(t('auth.emailInvalid'))
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, t('auth.emailInvalid'))
      .min(8, t('auth.emailMin')),
    password: yup
      .string()
      .required(t('auth.passwordRequired'))
      .matches(/(?=.*[A-Za-z])/, t('auth.passwordLetter'))
      .matches(/(?=.*[0-9])/, t('auth.passwordNumber'))
      .matches(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
        t('auth.passwordSpecial')
      )
      .min(8, t('auth.passwordMin')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>({
    reValidateMode: 'onChange',
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    try {
      if (props.authType === 'signin') {
        await signIn(data.email, data.password);
      } else if (props.authType === 'signup') {
        const newUserCreds = await signUp(data.email, data.password);
        await sendEmailVerification(newUserCreds);
      }
      navigate('/');
    } catch (e: unknown) {
      if (e instanceof Error) alert(e.message);
    }
  };

  return (
    <>
      <form className="w-[400px]" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t('auth.email')}
          type="email"
          data-testid="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label={t('auth.password')}
          type="password"
          data-testid="password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button className="w-full" size="md" variant="contained" color="blue">
          {t('submit')}
        </Button>
      </form>
    </>
  );
}
