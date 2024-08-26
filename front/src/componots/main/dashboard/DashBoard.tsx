import { Routes, Route } from 'react-router-dom';
import DoctorDashboard from './DoctorDash/DoctorDashboard';
import Appointments from './DoctorDash/Appointments';
import MedicalRecords from './DoctorDash/MedicalRecords';
import Prescriptions from './DoctorDash/Prescriptions';
import TestResult from './DoctorDash/TestResults';
import TodoList from './DoctorDash/Todo';
import ProfileManagement from './DoctorDash/ProfileAndSetting';
import NotFound from "../.././NotFound"
import PtaientLabTestForm from './DoctorDash/PtaientLabTestForm';

import ReceptionistDashboard from './RegisterDash/ReceptionistDashboard';
import MedicalRecordForm from './RegisterDash/MedicalRecordForm';
import Welcom from "./welcom/Welcom";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <Routes>
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="medical-records" element={<MedicalRecords />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="test-results" element={<TestResult />} />
        <Route path="tasks" element={<TodoList />} />
        <Route path="profile-settings" element={<ProfileManagement />} />
        <Route path="lab-test/add" element={<PtaientLabTestForm />} />
        <Route path="*" element={<NotFound />} />

        
        <Route path="/new" element={<ReceptionistDashboard />} />
        <Route path='/register/medicalRecords' element={<MedicalRecordForm />} />
        <Route path="welcom" element={<Welcom />} />
       


      </Routes>
    </div>
  );
};

export default Dashboard;
