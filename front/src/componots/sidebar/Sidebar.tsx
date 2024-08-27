import "./sidebar.css";
import { Route, Routes } from 'react-router-dom';

import Register from "./registrationNav/Register";
import DoctorSidebar from "./doctorNav/Doctor"
 import NurseSidebar from "./nurse/NurseSidebar";
import MedicalLab from "./medicalLab/MedicalLab";
const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar mt-4">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register/*" element={<Register />} />
            <Route path="/doctor/*" element={<DoctorSidebar />} />
            <Route path="/nurse/*" element={<NurseSidebar />} />
            <Route path="/medicallab/*" element={<MedicalLab />} />
      </Routes>
    </aside>
  );
};

export default Sidebar;
