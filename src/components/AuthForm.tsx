import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { signIn, signUp } from '../firebase';

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
      switch (props.authType) {
        case 'signin':
          await signIn(data.email, data.password);
          break;
        case 'signup':
          await signUp(data.email, data.password);
          break;
        default:
          break;
      }
      navigate('/');
    } catch {
      console.log('Wrong Credential');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <p>Email</p>
        <input type="email" {...register('email')} />
      </label>
      {errors.email && <p>{errors.email.message}</p>}
      <label>
        <p>Password</p>
        <input type="password" {...register('password')} />
      </label>
      {errors.password && <p>{errors.password.message}</p>}
      <button>Submit</button>
    </form>
  );
}
