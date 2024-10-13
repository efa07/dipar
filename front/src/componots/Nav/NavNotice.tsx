import { useState } from "react";
import "./navnotice.css";

const NavNotice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Example count

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="nav-notice-container">
      <div className="nav-notice-icon" onClick={toggleDropdown}>
        <i className="bi bi-bell-fill"></i>
        {notificationCount > 0 && (
          <span className="notification-badge">{notificationCount}</span>
        )}
      </div>
      {isOpen && (
        <div className="nav-notice-dropdown">
      
          <ul>
            <li>Task one</li>
            <li>Task one</li>
            <li>Task one</li>
            <li>Task one</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavNotice;
