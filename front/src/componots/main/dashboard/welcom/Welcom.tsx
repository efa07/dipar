import "./welcom.css"
import Logo from "../../../Nav/logo.png"
const Welcom = () => {
  return (
    <div className="welcome-page">
    <div className="welcome-content card">
      <div className="logo-section">
        <img src={Logo} alt="Health Management System Logo" className="logo" />
      </div>
      <h1 className="welcome-title">Welcome to the Future of Healthcare</h1>
      <p className="welcome-text">
        Our cutting-edge health management system ensures secure, efficient, and seamless care. Connect with your medical team and access your health data like never before.
      </p>
      <button className="get-started-button">Get Started</button>
    </div>
  </div>
  )
}

export default Welcom
