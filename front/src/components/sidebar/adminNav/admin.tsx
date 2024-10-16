// src/components/AdminSidebar.tsx
import './admin.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface SubItem {
  icon: JSX.Element;
  text: string;
  to: string;
}

interface SidebarItem {
  icon: string;
  text: string;
  to?: string;
  collapseId?: string;
  subItems?: SubItem[];
}

const sidebarItems: SidebarItem[] = [
 
  {
    icon: "bi bi-people-fill",
    text: "User Management",
    collapseId: "user-management-nav",
    subItems: [
      {
        icon: <i className="bi bi-person-plus-fill"></i>,
        text: "Add User",
        to: "/admin/createUser",
      },
      {
        icon: <i className="bi bi-person-lines-fill"></i>,
        text: "View Users",
        to: "/admin/editUser",
      },
    ],
  },
  

 
];

const AdminSidebar: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (collapseId: string) => {
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
                onClick={() => toggleItem(item.collapseId!)}
                aria-expanded={openItems[item.collapseId!] ? "true" : "false"}
                aria-controls={item.collapseId}
              >
                <i className={item.icon}></i>
                <span className="ms-2">{item.text}</span>
                <i className={`bi bi-chevron-${openItems[item.collapseId!] ? "up" : "down"} ms-auto`}></i>
              </div>
              <ul id={item.collapseId} className={`nav-content collapse ${openItems[item.collapseId!] ? "show" : ""}`}>
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
            <Link className="nav-link" to={item.to!}>
              <i className={item.icon}></i>
              <span className="ms-2">{item.text}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AdminSidebar;
