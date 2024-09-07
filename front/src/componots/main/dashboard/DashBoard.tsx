import { Routes, Route, useLocation } from 'react-router-dom';
import DoctorDashboard from "./DoctorDash/DoctorDashboard";
import Appointments from './DoctorDash/Appointments';
import MedicalRecords from './DoctorDash/MedicalRecords';
import Prescriptions from './DoctorDash/Prescriptions';
import TestResult from './DoctorDash/TestResults';
import TodoList from './DoctorDash/Todo';
import NotFound from "../../NotFound";
import PtaientLabTestForm from './DoctorDash/PtaientLabTestForm';

import ReceptionistDashboard from './RegisterDash/ReceptionistDashboard';
import MedicalRecordForm from './RegisterDash/MedicalRecordForm';
import Welcom from "./welcom/Welcom";
import AppointmentSchedulingForm from './RegisterDash/Appointment';

import NurseDash from "./NurseDash/NurseDash";
import NursePatient from "./NurseDash/NursePatient";
import PatientManagment from "./NurseDash/PatientManagment";
import PatientManagmentNote from './NurseDash/PatientManagmentNote';

import MedicalLabPage from './medicalLab/LabTest';
import MedicalStaffTestResultPage from './medicalLab/MedicalStaffTestResultPage';
import "./dashboard.css";

const Dashboard = () => {
  const location = useLocation(); // to get the curent path

  // change background style based on the current path
  const backgroundStyle = location.pathname === '/'
    ? {
        backgroundImage: 'url("../../../../c1.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width:'100vw'
      }
    : { backgroundColor: '#fff' };

  return (
    <div className="dashboard-content" style={backgroundStyle}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path='/' element={<Welcom/>}/>
        <Route path="/dashboard" element={<DoctorDashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/test-results" element={<TestResult />} />
        <Route path="/tasks" element={<TodoList />} />
        <Route path="/lab-test/add" element={<PtaientLabTestForm />} />

        <Route path="/new" element={<ReceptionistDashboard />} />
        <Route path='/medicalRecords' element={<MedicalRecordForm />} />
        <Route path="/welcom" element={<Welcom />} />
        <Route path="/appointment" element={<AppointmentSchedulingForm />} />
        
        <Route path='nurseDash' element={<NurseDash />} />
        <Route path="patient-management/vitals" element={<NursePatient />} />
        <Route path='patient-management/medication' element={<PatientManagment />} />
        <Route path='patient-management/notes' element={<PatientManagmentNote />} />

        <Route path='/medicallab' element={<Welcom/>} />
        <Route path='/lab-tests' element={<MedicalLabPage />} />
        <Route path="lab-test-results" element={<MedicalStaffTestResultPage />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
