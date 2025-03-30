import { NavLink } from 'react-router';

export default function MainPage() {
  return (
    <>
      Main Page
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/client">Rest API client</NavLink>
    </>
  );
}
