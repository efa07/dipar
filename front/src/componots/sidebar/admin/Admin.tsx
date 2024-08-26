import './admin.css'; // Make sure to have appropriate styles here

const adminSidebarItems = [
  {
    icon: "bi bi-speedometer2",
    text: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: "bi bi-person-lines-fill",
    text: "User Management",
    href: "/user-management",
  },
  {
    icon: "bi bi-gear-fill",
    text: "Settings",
    href: "/settings",
  },
  {
    icon: "bi bi-file-earmark-medical",
    text: "Medical Records",
    href: "/medical-records",
  },
  {
    icon: "bi bi-calendar-event",
    text: "Appointment Management",
    href: "/appointment-management",
  },
  {
    icon: "bi bi-receipt-fill",
    text: "Billing and Invoicing",
    href: "/billing",
  },
  {
    icon: "bi bi-book",
    text: "Resources",
    href: "/resources",
  },
  {
    icon: "bi bi-person-plus-fill",
    text: "Employee Management",
    href: "/employee-management",
  },
  {
    icon: "bi bi-person-circle",
    text: "Profile and Settings",
    href: "/profile-settings",
  },
  {
    icon: "bi bi-question-circle",
    text: "Help and Support",
    href: "/help",
  },
];

const Admin = () => {
  const style = {
    listStyle: 'none',
  };

  return (
    <ul className="sidebar-nav mt-5" id="sidebar-nav">
      {adminSidebarItems.map((item, index) => (
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
                    <a href={subItem.href} className="nav-link">
                      {subItem.icon}
                      <span className="ms-2">{subItem.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <a className="nav-link" href={item.href}>
              <i className={item.icon}></i>
              <span className="ms-2">{item.text}</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Admin;