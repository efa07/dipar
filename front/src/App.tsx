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
import PrivateRoute from './components/context/PrivateRoute';
import { AuthProvider } from './components/context/AuthContex'; 
import Chat from "./components/chat/Chat";

// Separate Component to handle layout
const MainLayout = () => {
  const location = useLocation();
  const hideHeaderAndSidebar = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

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
            <Route path="/doctor/*" element={<PrivateRoute requiredRole="doctor"><Dashboard /></PrivateRoute>} />
            <Route path="/nurse/*" element={<PrivateRoute requiredRole="nurse"><Dashboard /></PrivateRoute>} />
            <Route path="/medicallab/*" element={<PrivateRoute requiredRole="lab-staff"><Dashboard /></PrivateRoute>} />
            <Route path="/admin/*" element={<PrivateRoute requiredRole="admin"><Dashboard /></PrivateRoute>} />
            <Route path="/register/*" element={<PrivateRoute requiredRole="receptionist"><Dashboard /></PrivateRoute>} />
            <Route path="/" element={<Welcom />} />
            <Route path="/chat" element={<Chat/>} />
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
