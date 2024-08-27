import './nurse.css'; 
import { Link } from 'react-router-dom';

const nurseSidebarItems = [
  {
    icon: "bi bi-speedometer2",
    text: "Dashboard",
    to: "/nurse/nurseDash",
  },
  {
    icon: "bi bi-person-lines-fill",
    text: "Patient Management",
    collapseId: "patient-management-nav",
    subItems: [
      {
        icon: <i className="bi bi-thermometer"></i>, 
        text: "View Vital Signs",
        to: "/nurse/patient-management/vitals",
      },
      {
        icon: <i className="bi bi-bandaid-fill"></i>, 
        text: "Administer Medication",
        to: "/nurse/patient-management/medication",
      },
      {
        icon: <i className="bi bi-clipboard-check"></i>,
        text: "Add Patient Notes",
        to: "/nurse/patient-management/notes",
      },
    ],
  },
  {
    icon: "bi bi-file-earmark-medical",
    text: "Medical Records",
    to: "/nurse/medical-records",
  },

  {
    icon: "bi bi-check-circle",
    text: "Tasks",
    to: "/nurse/tasks",
  },
  {
    icon: "bi bi-person-circle",
    text: "Profile and Settings",
    to: "/nurse/profile-settings",
  },
];

const NurseSidebar = () => {
  const style = {
    listStyle: 'none',
  };

  return (
    <ul className="sidebar-nav mt-5" id="sidebar-nav">
      {nurseSidebarItems.map((item, index) => (
        <li className="nav-item" key={index}>
          {item.subItems ? (
            <>
              <Link
                className="nav-link collapsed"
                data-bs-toggle="collapse"
                data-bs-target={`#${item.collapseId}`}
                aria-expanded="false"
                aria-controls={item.collapseId}
                to="#"
              >
                <i className={item.icon}></i>
                <span className="ms-2">{item.text}</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </Link>
              <ul id={item.collapseId} className="nav-content collapse" style={style}>
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

export default NurseSidebar;