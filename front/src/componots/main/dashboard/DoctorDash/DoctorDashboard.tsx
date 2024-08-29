import "./doctorDashBoard.css";
import { useState, useEffect } from "react";
import Logo from "./user .png"; // Make sure the path is correct for your image

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/patients"); // Replace with your actual backend API URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return <p>Loading patient data...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <div className="doctor-dashboard">
      <h2>Patient Dashboard</h2>
      {patients.length > 0 ? (
        patients.map(patient => (
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
