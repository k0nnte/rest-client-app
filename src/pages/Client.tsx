import { redirect } from 'react-router-dom';
import { isAuth } from '../services/auth';
import { Outlet } from 'react-router';

export async function clientLoader() {
  const isLogged = await isAuth();

  if (!isLogged) {
    throw redirect('/');
  }
}

export default function SignIn() {
  return <Outlet />;
}
