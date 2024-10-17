import { Link } from 'react-router-dom';

const sidebarItems = [
 
];

const MainSidebar = () => {
  return (
    <ul className="sidebar-nav mt-5" id="sidebar-nav">
      {sidebarItems.map((item, index) => (
        <li className="nav-item" key={index}>
          <Link className="nav-link" to={item.to}>
            <i className={item.icon}></i>
            <span className="ms-2">{item.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MainSidebar;
