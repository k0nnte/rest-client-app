import { NavLink } from 'react-router';
import './Authorized.scss';

interface IAuthorized {
  name: string;
}

export default function Authorized({ name }: IAuthorized) {
  return (
    <div className="wrapper_main">
      <p className="main_paragraph"> Welcome Back, {name}</p>

      <div className="wrapper_btn">
        <NavLink to="/rest">
          <button>REST Client</button>
        </NavLink>
        <NavLink to="/history">
          <button>History </button>
        </NavLink>
        <NavLink to="/variables">
          <button>Variables</button>
        </NavLink>
      </div>
    </div>
  );
}
