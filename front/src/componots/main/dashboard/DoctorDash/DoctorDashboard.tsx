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
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  //find the patient whose full name matches the search term
  const searchedPatient = patients.find(
    (patient) =>
      `${patient.firstName.toLowerCase()} ${patient.lastName.toLowerCase()}`.includes(
        searchTerm.toLowerCase()
      )
  );

  if (loading) {
    return (
      <div className="d-loader">
        <ScaleLoader color="#22ffca" height={100} loading radius={1} width={9} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-loader">
        Error loading data: {error}
        <ScaleLoader color="red" height={100} loading radius={1} width={9} />
      </div>
    );
  }

  return (
    <div className="doctor-dashboard">
      <h2>Patient Dashboard</h2>
      
      {/* Search field */}
      <input
        type="text"
        className="search-input"
        placeholder="Search patient by full name..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{marginLeft:'30%'}}
      />

      {searchedPatient ? (
        <div className="patient-info">
          <h3>Patient Information</h3>
          <div className="imgName">
            <img src={Logo} alt="Patient Avatar" />
          </div>
          <div className="info">
            <p><strong>Name:</strong> {searchedPatient.firstName} {searchedPatient.lastName}</p>
            <p><strong>Date of Birth:</strong> {new Date(searchedPatient.dob).toLocaleDateString()}</p>
            <p><strong>Gender:</strong> {searchedPatient.gender}</p>
            <p><strong>City:</strong> {searchedPatient.city}</p>
            <p><strong>State:</strong> {searchedPatient.state}</p>
            <p><strong>Zip Code:</strong> {searchedPatient.zip}</p>
            <p><strong>Email:</strong> {searchedPatient.email}</p>
            <p><strong>Emergency Contact Name:</strong> {searchedPatient.emergencyContactName}</p>
            <p><strong>Emergency Contact Phone:</strong> {searchedPatient.emergencyContactPhone}</p>
            <p><strong>Relationship:</strong> {searchedPatient.relationship}</p>
          </div>
         
        </div>

        
      ) : (
        <p style={{color:'var(--primary)',fontSize:"2rem",textAlign:'center'}}>Type full patient name</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
