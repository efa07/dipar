import "./sidebar.css";
import { Route, Routes } from 'react-router-dom';

import Register from "./registrationNav/Register";
import DoctorSidebar from "./doctorNav/Doctor"
 import NurseSidebar from "./nurse/NurseSidebar";
import MedicalLab from "./medicalLab/MedicalLab";
import MainSidebar from "./mainNav/MainNav"
import AdminSidebar from './adminNav/admin'

const Sidebar = () => {
  const isLoged = localStorage.getItem('userRole')
  const style = isLoged ? "sidebar mt-4" : "hide"
  return (
    <aside id="sidebar" className={style}>
      <Routes>
        <Route path="/register/*" element={isLoged === 'receptionist' ? <Register /> :<MainSidebar />} />
            <Route path="/doctor/*" element={isLoged === 'doctor' ? <DoctorSidebar/>: <MainSidebar />} />
            <Route path="/nurse/*" element={isLoged === 'nurse' ? <NurseSidebar /> :<MainSidebar />} />
            <Route path="/medicallab/*" element={isLoged === 'lab-staff' ? <MedicalLab />:<MainSidebar />} />
            <Route path="/admin/*" element={isLoged === 'admin' ? <AdminSidebar/>:<MainSidebar />}/>
      </Routes>
    </aside>
  );
};

export default Sidebar;
