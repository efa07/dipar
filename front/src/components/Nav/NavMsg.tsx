import "./navmsg.css"
import {Link} from "react-router-dom"
const NavMsg = () => {
  return (
    <div >
  <Link to='chat'>
  <i className="bi bi-chat-dots-fill"></i> 
</Link>
 </div>
  )
}

export default NavMsg
