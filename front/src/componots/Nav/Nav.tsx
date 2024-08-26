import "./nav.css"
import NavAvatar from "./NavAvatar"
import NavMsg from "./NavMsg"
import NavNotice from "./NavNotice"

const Nav = () => {
  return (
    <nav className="header-nav ms-auto">
        <div className="not">
        <ul className="d-flex align-items-center">
            <NavNotice />
            <NavMsg />
            <NavAvatar />
        </ul>
        </div>
        <i className="bi bi-list"></i>
        

    </nav>
  )
}

export default Nav
