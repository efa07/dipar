import logo from "./logo.png"
import "./logo.css"
const Logo = () => {


  return (
<div className="d-flex align-items-center justify-content-between">
    <a href='/' className='logo d-flex align-items-center'>
    <img src={logo} alt='logo' />
    </a>
    </div>
  )
}

export default Logo
