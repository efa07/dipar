import "./rigster.css"
import { Link } from 'react-router-dom';

const sidebarItems = [
    {
      icon: "bi bi-file-plus",
      text: "Patient Registration",
      collapseId: "components-nav",
      subItems: [
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25px"
              viewBox="0 -960 960 960"
              width="25px"
              fill="#5f6368"
            >
              <path d="M726.67-400v-126.67H600v-66.66h126.67V-720h66.66v126.67H920v66.66H793.33V-400h-66.66ZM360-480.67q-66 0-109.67-43.66Q206.67-568 206.67-634t43.66-109.67Q294-787.33 360-787.33t109.67 43.66Q513.33-700 513.33-634t-43.66 109.67Q426-480.67 360-480.67ZM40-160v-100q0-34.67 17.5-63.17T106.67-366q70.66-32.33 130.89-46.5 60.22-14.17 122.33-14.17T482-412.5q60 14.17 130.67 46.5 31.66 15 49.5 43.17Q680-294.67 680-260v100H40Zm66.67-66.67h506.66V-260q0-14.33-7.83-27t-20.83-19q-65.34-31-116.34-42.5T360-360q-57.33 0-108.67 11.5Q200-337 134.67-306q-13 6.33-20.5 19t-7.5 27v33.33ZM360-547.33q37 0 61.83-24.84Q446.67-597 446.67-634t-24.84-61.83Q397-720.67 360-720.67t-61.83 24.84Q273.33-671 273.33-634t24.84 61.83Q323-547.33 360-547.33Zm0-86.67Zm0 407.33Z" />
            </svg>
          ),
          text: "Register Patient",
          href: "/register/new",
        },
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25px"
              viewBox="0 -960 960 960"
              width="25px"
              fill="#5f6368"
            >
              <path d="M426-136v-250L210-261l-55-93 217-126-216-125 54-93 216 125v-251h108v251l216-125 54 93-216 125 217 126-55 93-216-125v250H426Z" />
            </svg>
          ),
          text: "Emergency Registration",
          href: "/register/emergency",
        },
      ],
    },
    {
      icon: "bi bi-calendar-month",
      text: "Appointment Scheduling",
      href: "/register/appointment"
    },
    {
      icon: "bi bi-file-medical",
      text: "Medical Records",
      href: "/register/medicalRecords"
    },
    {
      icon: "bi bi-person",
      text: "Profile",
      href: "/register/profile",
    },
];

const Register = () => {
  const style = {
    listStyle: 'none',
  };

  return (
    <div className="sidebar-content">

    <ul className="sidebar-nav mt-5" id="sidebar-nav">
      {sidebarItems.map((item, index) => (
        <li className="nav-item" key={index}>
          {item.subItems ? (
            <>
              <a
                className="nav-link collapsed"
                data-bs-toggle="collapse"
                data-bs-target={`#${item.collapseId}`}
                aria-expanded="false"
                aria-controls={item.collapseId}
                href="#"
              >
                <i className={item.icon}></i>
                <span className="ms-2">{item.text}</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id={item.collapseId} className="nav-content collapse" style={style}>
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link to={subItem.href} className="nav-link">
                      {subItem.icon}
                      <span className="ms-2">{subItem.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link className="nav-link" to={item.href}>
              <i className={item.icon}></i>
              <span className="ms-2">{item.text}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Register;
