import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { isAuth } from '../services/auth';

export async function clientLoader() {
  const isLogged = await isAuth();
  if (isLogged) {
    throw redirect('/');
  }
}

export default function SignIn() {
  return <AuthForm authType={'signin'} />;
}
