import "./sidebar.css";
import { Route, Routes } from 'react-router-dom';

import Register from "./registrationNav/Register";
import DoctorSidebar from "./doctorNav/Doctor"
 import NurseSidebar from "./nurse/NurseSidebar";
import MedicalLab from "./medicalLab/MedicalLab";
import Pharmacy from "./pharmacy/Pharmacy";
import Admin from "./admin/Admin";
import Radiology from "./radiology/Radiology"
const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar mt-4">
      <Routes>
        <Route path="/" element={<Register />} />
      <Route path="/register/*" element={<Register />} />
            <Route path="/doctor/*" element={<DoctorSidebar />} />
            <Route path="/nurse/*" element={<NurseSidebar />} />
            <Route path="/medicallab/*" element={<MedicalLab />} />
            <Route path="/pharmacy/*" element={<Pharmacy />} />
            <Route path="/radiology/*" element={<Radiology />} />
            <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </aside>
  );
};

export default Sidebar;
