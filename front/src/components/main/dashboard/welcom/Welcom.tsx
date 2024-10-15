import { useNavigate, useLocation } from "react-router-dom";
import "./welcom.css";
import Logo from "../../../Nav/logo.png";

const Welcom = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = () => {
    navigate("/login");
  };

  // Get userRole from localStorage
  const userRole = localStorage.getItem("userRole");

  // Check if the current path is "/"
  if (location.pathname === "/") {
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
          <button className="get-started-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    );
  } else {
    // If userRole is present, greet the user
    return (
      <div className="welcome-page">
        <div className="welcome-content card">
          <div className="logo-section">
            <img src={Logo} alt="Health Management System Logo" className="logo" />
          </div>
          <h1 className="welcome-title">Welcome {userRole}</h1>
          <p className="welcome-text">
            Please use the sidebar to access the features of the Health Management System.
          </p>
        
        </div>
      </div>
    );
  }
};

export default Welcom;
