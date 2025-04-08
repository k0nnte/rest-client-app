import { redirect } from 'react-router-dom';
import { isAuth } from '../services/auth';
import { useLocation } from 'react-router';
import Rest from './Rest';

export async function clientLoader() {
  const isLogged = await isAuth();

  if (!isLogged) {
    console.log('не');

    throw redirect('/');
  }
}

export default function SignIn() {
  const location = useLocation();
  const isRest = location.pathname.includes('/rest');
  return isRest ? <Rest /> : <div>s</div>;
}
