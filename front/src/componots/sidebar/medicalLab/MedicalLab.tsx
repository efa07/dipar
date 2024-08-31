import './medical.css'; 
import { Link } from 'react-router-dom';
const medicalLabItems = [
  {
    icon: "bi bi-microscope",
    text: "Lab Tests",
    to: "lab-tests",

  },
  {
    icon: "bi bi-clipboard-data",
    text: "Test Results",
    to: "lab-test-results",
  },

];

const MedicalLab = () => {
  const style = {
    listStyle: 'none',
  };

  return (


<ul className="sidebar-nav mt-5" id="sidebar-nav">
      {medicalLabItems.map((item, index) => (
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

export default MedicalLab;