import "./App.css";
// icons
import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// components
import Header from "./components/Nav/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./components/main/dashboard/DashBoard";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Login from "./components/Login/Login";
import NotFound from "./components/NotFound";
import Welcom from "./components/main/dashboard/welcom/Welcom";
import Chat from "./components/chat/Chat";

// Separate Component to handle layout
const MainLayout = () => {
  const location = useLocation();
  const hideHeaderAndSidebar = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

  // Conditionally add a class to the app-container
  const isSpecialRoute = location.pathname === '/' || location.pathname === '/login';
  const isLogin = location.pathname === '/login';
  const isLoged = localStorage.getItem('userRole')
  return (
    <>
      {isLoged && !hideHeaderAndSidebar && <Header />}
      <div className={`app-container ${isSpecialRoute ? 'special-container' : ''}`}>
        {!hideHeaderAndSidebar && (
          <div className="sidebarapp">
            <Sidebar />
          </div>
        )}
        <main className={`main-content ${isLogin ? 'login-scale' : ''}`}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/login/*" element={<Login />} />
            <Route path="/doctor/*" element={isLoged === 'doctor' ? <Dashboard /> : <Login/>} />
            <Route path="/nurse/*" element={isLoged === 'nurse' ? <Dashboard /> : <Login/>} />
            <Route path="/medicallab/*" element={isLoged === 'lab-staff' ? <Dashboard /> : <Login/>} />
            <Route path="/admin/*" element={isLoged === 'admin' ? <Dashboard /> : <Login/>} />
            <Route path="/register/*" element={isLoged === 'receptionist' ? <Dashboard /> : <Login/>} />
            <Route path="/" element={<Welcom />} />
            <Route path="/chat" element={isLoged ? <Chat/> : <Login />} />
          </Routes>
        </main>
      </div>
    </>
  );
};


function App() {
  return (
 
     <Router>
      <MainLayout />
    </Router>
   
   
  );
}

export default App;
