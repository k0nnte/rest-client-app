import { redirect } from 'react-router-dom';
import { isAuth } from '../services/auth';

export async function clientLoader() {
  const isLogged = await isAuth();
  if (!isLogged) {
    throw redirect('/');
  }
}

export default function SignIn() {
  return <>This route should be protected.</>;
}
