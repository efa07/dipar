import Logo from "./Logo"
import "./header.css"
import Nav from "./Nav"


const Header = () => {
  return (
   <header id="header" className="header fixed-top d-flex align-items-center">
<Logo />
<Nav />
   </header>
  )
}

export default Header
