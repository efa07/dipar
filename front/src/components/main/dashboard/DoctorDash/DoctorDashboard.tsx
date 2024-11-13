 import "./doctorDashBoard.css";
import { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Logo from "./user .png";

// Define the Patient type
interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  relationship: string;
  allergies: string;
  medications: string;
  marital_status: string;
  occupation: string;
  insurance_provider: string;
  policy_number: string;
  group_number: string;
  created_at: string;
  updated_at: string;
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

  // Find the patient whose full name matches the search term
  const searchedPatient = patients.find(
    (patient) =>
      `${patient.first_name?.toLowerCase() || ""} ${patient.last_name?.toLowerCase() || ""}`.includes(
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
      
      {/* Search field */}
      <div className="searchField">
      <h2>Patient Information</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search patient by full name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="imgName">
            <img src={Logo} alt="Patient Avatar" />
          </div>
      </div>
  
      {searchedPatient ? (
        <div className="patient-info">
          
          <table className="patient-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{`${searchedPatient.first_name?.toUpperCase() || ""} ${searchedPatient.last_name?.toUpperCase() || ""}`}</td>
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>{searchedPatient.dob ? new Date(searchedPatient.dob).toLocaleDateString() : ""}</td>
              </tr>
              <tr>
                <td><strong>Gender:</strong></td>
                <td>{searchedPatient.gender?.toUpperCase() || ""}</td>
              </tr>
              <tr>
                <td><strong>City:</strong></td>
                <td>{searchedPatient.city?.toUpperCase() || ""}</td>
              </tr>
              <tr>
                <td><strong>State:</strong></td>
                <td>{searchedPatient.state?.toUpperCase() || ""}</td>
              </tr>
              <tr>
                <td><strong>Zip Code:</strong></td>
                <td>{searchedPatient.zip || ""}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{searchedPatient.email || ""}</td>
              </tr>
              <tr>
                <td><strong>Emergency Contact Name:</strong></td>
                <td>{searchedPatient.emergency_contact_name?.toUpperCase() || ""}</td>
              </tr>
              <tr>
                <td><strong>Emergency Contact Phone:</strong></td>
                <td>{searchedPatient.emergency_contact_phone || ""}</td>
              </tr>
              <tr>
                <td><strong>Relationship:</strong></td>
                <td>{searchedPatient.relationship?.toUpperCase() || ""}</td>
              </tr>
              <tr>
                <td><strong>Allergies:</strong></td>
                <td>{searchedPatient.allergies?.toUpperCase() || ""}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ color: 'var(--primary)', fontSize: "2rem", textAlign: 'center' }}>
          Type full patient name
        </p>
      )}
    </div>
  );
  
};

export default DoctorDashboard;


