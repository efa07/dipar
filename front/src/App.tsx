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
import Dashboard from "./componots/main/dashboard/DashBoard"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import TodoApp from "./componots/test/Test";

function App() {
  return (
    // <TodoApp />
    <Router>
      <Header />
      <div className="app-container">
        <div className="sidebarapp">
        <Sidebar />
        </div>
        <main className="main-content">
          <Routes>
            <Route path="/doctor/*" element={<Dashboard />} />
            <Route path="/nurse/*" element={<Dashboard />} />
            <Route path="/medicallab/*" element={<Dashboard />} />
            <Route path="/pharmacy/*" element={<Dashboard />} />
            <Route path="/radiology/*" element={<Dashboard />} />
            <Route path="/admin/*" element={<Dashboard />} />
            <Route path="/register/*" element={<Dashboard />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
