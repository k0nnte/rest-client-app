import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { signIn, signUp } from '../firebase';
import { sendEmailVerification } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

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
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="auth-label">
          <p className="auth-label-title">{t('auth.email')}</p>
          <input type="email" className="auth-input" {...register('email')} />
          {errors.email && <p className="auth-error">{errors.email.message}</p>}
        </label>
        <label className="auth-label">
          <p className="auth-label-title">{t('auth.password')}</p>
          <input
            type="password"
            className="auth-input"
            {...register('password')}
          />
          {errors.password && (
            <p className="auth-error">{errors.password.message}</p>
          )}
        </label>
        <button>{t('submit')}</button>
      </form>
    </>
  );
}
