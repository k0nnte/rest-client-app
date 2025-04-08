import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import Logoutbtn from './Logoutbtn';
import './Header.scss';

export default function Header() {
  const [user, setuser] = useState<User | null>(null);

  useEffect(() => {
    const aunt = getAuth();
    const sub = onAuthStateChanged(aunt, setuser);
    return () => sub();
  }, []);

  return (
    <header className="header">
      <NavLink to="/">
        <img src="/" alt="logo" />
      </NavLink>
      <div className="button_wrapper">
        <button className="btn">Lang Toggle</button>

        {user ? (
          <Logoutbtn />
        ) : (
          <>
            <NavLink to="/signin">
              <button className="btn">Sign In</button>
            </NavLink>
            <NavLink to="/signup">
              <button className="btn">Sign Up</button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}
