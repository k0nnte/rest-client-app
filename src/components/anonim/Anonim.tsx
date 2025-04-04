import { NavLink } from 'react-router';
import './Anonim.scss';

const Anonim = () => {
  return (
    <div className="wrapper_anon_main">
      <p>Welcome</p>
      <div className="btn_wrapper">
        <NavLink to="/signin">
          <button>Sign In</button>
        </NavLink>
        <NavLink to="/signup">
          <button>Sign Up</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Anonim;
