import { useLocation } from "react-router-dom";
import "./nav.css";
import NavNotice from "./NavNotice";
import Logout from "./Logout";

const Nav = () => {
  const location = useLocation(); 

  return (
    <nav className="header-nav ms-auto">
      <div className="not">
        <ul className="d-flex align-items-center">
        {location.pathname.startsWith("/doctor") && <NavNotice />}

          <Logout />
        </ul>
      </div>
      <i className="bi bi-list"></i>
    </nav>
  );
};

export default Nav;
