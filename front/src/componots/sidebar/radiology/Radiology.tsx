
const radiologySidebarItems = [
  {
    icon: "bi bi-x-ray",
    text: "Imaging Procedures",
    href: "/imaging-procedures",
  },
  {
    icon: "bi bi-clipboard-data",
    text: "Test Results",
    href: "/test-results",
  },
  {
    icon: "bi bi-person-lines-fill",
    text: "Patient Management",
    collapseId: "patient-management-nav",
    subItems: [
      {
        icon: <i className="bi bi-person-plus-fill"></i>,
        text: "Add New Patient",
        href: "/patient-management/add",
      },
      {
        icon: <i className="bi bi-person-check-fill"></i>,
        text: "Manage Patients",
        href: "/patient-management/manage",
      },
    ],
  },
  {
    icon: "bi bi-file-earmark-medical",
    text: "Medical Records",
    href: "/medical-records",
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

const Radiology = () => {
  const style = {
    listStyle: 'none',
  };

  return (
    <ul className="sidebar-nav mt-5" id="sidebar-nav">
      {radiologySidebarItems.map((item, index) => (
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

export default Radiology;