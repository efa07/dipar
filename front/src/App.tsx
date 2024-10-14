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
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Login from "./componots/Login/Login";
import SignUp from "./componots/Signup/Signup";
import NotFound from "./componots/NotFound";
import Welcom from "./componots/main/dashboard/welcom/Welcom";
import PrivateRoute from './componots/context/PrivateRoute';
import { AuthProvider } from './componots/context/AuthContex'; 

// Separate Component to handle layout
const MainLayout = () => {
  const location = useLocation();
  const hideHeaderAndSidebar = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/' || location.pathname === '*';

  // Conditionally add a class to the app-container
  const isSpecialRoute = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      {!hideHeaderAndSidebar && <Header />}
      <div className={`app-container ${isSpecialRoute ? 'special-container' : ''}`}>
        {!hideHeaderAndSidebar && (
          <div className="sidebarapp">
            <Sidebar />
          </div>
        )}
        <main className="main-content">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<PrivateRoute requiredRole="admin"><SignUp /></PrivateRoute>} />
            <Route path="/doctor/*" element={<PrivateRoute requiredRole="doctor"><Dashboard /></PrivateRoute>} />
            <Route path="/nurse/*" element={<PrivateRoute requiredRole="nurse"><Dashboard /></PrivateRoute>} />
            <Route path="/medicallab/*" element={<PrivateRoute requiredRole="lab-staff"><Dashboard /></PrivateRoute>} />
            <Route path="/admin/*" element={<PrivateRoute requiredRole="admin"><Dashboard /></PrivateRoute>} />
            <Route path="/register/*" element={<PrivateRoute requiredRole="receptionist"><Dashboard /></PrivateRoute>} />
            <Route path="/" element={<Welcom />} />
          </Routes>
        </main>
      </div>
    </>
  );
};


function App() {
  return (
    <AuthProvider>
     <Router>
      <MainLayout />
    </Router>
    </AuthProvider>
   
  );
}

export default App;
