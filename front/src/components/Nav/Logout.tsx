import "./Logout.css";

const Logout = () => {
  const handleLogout = () => {
    localStorage.clear();

    window.location.href = "/login";
  };

  return (
    <div className="logout-bar">
      <form className="logout-form d-flex align-items-center" method="POST" action="#">
        <button 
          type="button" 
          title="Logout" 
          className="logout-button" 
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </form>
    </div>
  );
};

export default Logout;
