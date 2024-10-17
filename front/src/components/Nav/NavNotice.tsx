import { useEffect, useState } from "react";
import "./navnotice.css";

const NavNotice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/appointments");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        const pendingAppointments = data.filter(
          (appointment:any) => appointment.status === "pending"
        );
        setPendingCount(pendingAppointments.length);
      } catch (error) {
        console.error("Error fetching pending appointments:", error);
      }
    };

    fetchPendingAppointments();
  }, []);

  return (
    <div className="nav-notice-container">
      <div className="nav-notice-icon" onClick={toggleDropdown}>
        <i className="bi bi-bell-fill"></i>
        {pendingCount > 0 && (
          <span className="notification-badge">{pendingCount}</span>
        )}
      </div>
      {isOpen && (
        <div className="nav-notice-dropdown">
          <ul>
            <li>you have pending appointments {pendingCount} </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavNotice;
