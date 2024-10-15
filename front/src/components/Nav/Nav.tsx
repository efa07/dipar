import "./nav.css"
import NavNotice from "./NavNotice"
import Logout from "./Logout"

const Nav = () => {
  return (
    <nav className="header-nav ms-auto">
        <div className="not">
        <ul className="d-flex align-items-center">
            <NavNotice />
            <Logout />

        </ul>
        </div>
        <i className="bi bi-list"></i>
        

    </nav>
  )
}

export default Nav
