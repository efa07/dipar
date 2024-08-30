import "./doctorDashBoard.css";
import { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Logo from "./user .png"; 

// Define the Patient type
interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  relationship: string;
}

const DoctorDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/patients");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Patient[] = await response.json();
        setPatients(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return  <div className="d-loader">Loading data...
    <ScaleLoader
        color="#22ffca"
        height={100}
        loading
        radius={1}
        width={9}
      />
    </div>;
  }

  if (error) {
    return <div className="d-loader">Error loading data: {error}
    <ScaleLoader
        color="#22ffca"
        height={100}
        loading
        radius={1}
        width={9}
      />
    </div>;
  }

  return (
    <div className="doctor-dashboard">
      <h2>Patient Dashboard</h2>
      {patients.length > 0 ? (
        patients.map((patient) => (
          <div key={patient.id} className="patient-info">
            <h3>Patient Information</h3>
            <div className="imgName">
              <img src={Logo} alt="Patient Avatar" />
            </div>
            <div className="info">
              <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
              <p><strong>Date of Birth:</strong> {new Date(patient.dob).toLocaleDateString()}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>City:</strong> {patient.city}</p>
              <p><strong>State:</strong> {patient.state}</p>
              <p><strong>Zip Code:</strong> {patient.zip}</p>
              <p><strong>Email:</strong> {patient.email}</p>
              <p><strong>Emergency Contact Name:</strong> {patient.emergencyContactName}</p>
              <p><strong>Emergency Contact Phone:</strong> {patient.emergencyContactPhone}</p>
              <p><strong>Relationship:</strong> {patient.relationship}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No patient data available.</p>
      )}
    </div>
  );
};

export default DoctorDashboard;