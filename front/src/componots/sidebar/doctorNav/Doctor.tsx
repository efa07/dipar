import './doctor.css';
import { Link } from 'react-router-dom'; 
import { useState } from 'react';

const sidebarItems = [
  {
    icon: "bi bi-speedometer2",
    text: "Dashboard",
    to: "/doctor/dashboard",
  },
  {
    icon: "bi bi-calendar-event",
    text: "Appointments",
    to: "/doctor/appointments",
  },
  {
    icon: "bi bi-person-lines-fill",
    text: "Lab Test",
    collapseId: "patient-management-nav",
    subItems: [
      {
        icon: <i className="fi fi-tr-microscope"></i>,
        text: "Add Lab Test",
        to: "/doctor/lab-test/add", 
      },
   
    ],
  },
  {
    icon: "bi bi-file-earmark-medical",
    text: "Medical Records",
    to: "/doctor/medical-records",
  },
  {
    icon: "bi bi-prescription",
    text: "Prescriptions",
    to: "/doctor/prescriptions",
  },
  {
    icon: "bi bi-bar-chart",
    text: "Test Results",
    to: "/doctor/test-results",
  },
  {
    icon: "bi bi-chat-dots",
    text: "Messages",
    to: "/doctor/messages",
  },
  {
    icon: "bi bi-check-circle",
    text: "Tasks",
    to: "/doctor/tasks",
  },
  {
    icon: "bi bi-person-circle",
    text: "Profile and Settings",
    to: "/doctor/profile-settings",
  },
  {
    icon: "bi bi-question-circle",
    text: "Help and Support",
    to: "/doctor/help",
  },
];

const DoctorSidebar = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (collapseId) => {
    setOpenItems(prev => ({ ...prev, [collapseId]: !prev[collapseId] }));
  };

  return (
    <ul className="sidebar-nav mt-5" id="sidebar-nav">
      {sidebarItems.map((item, index) => (
        <li className="nav-item" key={index}>
          {item.subItems ? (
            <>
              <div
                className="nav-link collapsed"
                onClick={() => toggleItem(item.collapseId)}
                aria-expanded={openItems[item.collapseId] ? "true" : "false"}
                aria-controls={item.collapseId}
              >
                <i className={item.icon}></i>
                <span className="ms-2">{item.text}</span>
                <i className={`bi bi-chevron-${openItems[item.collapseId] ? "up" : "down"} ms-auto`}></i>
              </div>
              <ul id={item.collapseId} className={`nav-content collapse ${openItems[item.collapseId] ? "show" : ""}`}>
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link to={subItem.to} className="nav-link">
                      {subItem.icon}
                      <span className="ms-2">{subItem.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link className="nav-link" to={item.to}>
              <i className={item.icon}></i>
              <span className="ms-2">{item.text}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DoctorSidebar;
