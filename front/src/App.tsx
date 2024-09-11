import "./App.css";
// icons
import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// components
import Header from "./componots/Nav/Header";
import Sidebar from "./componots/sidebar/Sidebar";
import Dashboard from "./componots/main/dashboard/DashBoard";
import { BrowserRouter as Router, Routes, Route, useLocation, BrowserRouter } from "react-router-dom";

import Login from "./componots/Login/Login";
import SignUp from "./componots/Signup/Signup";
import NotFound from "./componots/NotFound";
import Welcom from "./componots/main/dashboard/welcom/Welcom";

// Separate Component to handle layout
const MainLayout = () => {
  const location = useLocation();
  const hideHeaderAndSidebar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideHeaderAndSidebar && <Header />}
      <div className="app-container">
        {!hideHeaderAndSidebar && (
          <div className="sidebarapp">
            <Sidebar />
          </div>
        )}
        <main className="main-content">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/doctor/*" element={<Dashboard />} />
            <Route path="/nurse/*" element={<Dashboard />} />
            <Route path="/medicallab/*" element={<Dashboard />} />
            <Route path="/pharmacy/*" element={<Dashboard />} />
            <Route path="/radiology/*" element={<Dashboard />} />
            <Route path="/admin/*" element={<Dashboard />} />
            <Route path="/register/*" element={<Dashboard />} />
            <Route path="/" element={<Welcom />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
     <Router>
      <MainLayout />
    </Router>
   
  );
}

export default App;
