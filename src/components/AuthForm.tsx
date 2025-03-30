import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { signIn, signUp } from '../firebase';
import { sendEmailVerification } from 'firebase/auth';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please enter a valid email')
    .min(8, 'Email must have at lease 8 symbols'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/(?=.*[A-Za-z])/, 'Password must contain at least one letter')
    .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
      'Password must contain at least one special character !@#$%^&*()_+-=[]{};\':"\\|,.<>/?'
    )
    .min(8, 'Password must have at lease 8 symbols'),
});

type AuthInputs = {
  email: string;
  password: string;
};

export default function AuthForm(props: { authType: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>({
    reValidateMode: 'onChange',
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

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
          <p className="auth-label-title">Email</p>
          <input type="email" className="auth-input" {...register('email')} />
          {errors.email && <p className="auth-error">{errors.email.message}</p>}
        </label>
        <label className="auth-label">
          <p className="auth-label-title">Password</p>
          <input
            type="password"
            className="auth-input"
            {...register('password')}
          />
          {errors.password && (
            <p className="auth-error">{errors.password.message}</p>
          )}
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
