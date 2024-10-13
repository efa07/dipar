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

  // Find the patient whose full name matches the search term
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
      <div className="searchField">
        <input
        type="text"
        className="search-input"
        placeholder="Search patient by full name..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginLeft: '30%' }}
      />
      </div>
      

      {searchedPatient ? (
        <div className="patient-info">
          <h3>Patient Information</h3>
          <div className="imgName">
            <img src={Logo} alt="Patient Avatar" />
          </div>
          <table className="patient-table">
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{searchedPatient.firstName} {searchedPatient.lastName}</td>
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>{new Date(searchedPatient.dob).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td><strong>Gender:</strong></td>
                <td>{searchedPatient.gender}</td>
              </tr>
              <tr>
                <td><strong>City:</strong></td>
                <td>{searchedPatient.city}</td>
              </tr>
              <tr>
                <td><strong>State:</strong></td>
                <td>{searchedPatient.state}</td>
              </tr>
              <tr>
                <td><strong>Zip Code:</strong></td>
                <td>{searchedPatient.zip}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{searchedPatient.email}</td>
              </tr>
              <tr>
                <td><strong>Emergency Contact Name:</strong></td>
                <td>{searchedPatient.emergencyContactName}</td>
              </tr>
              <tr>
                <td><strong>Emergency Contact Phone:</strong></td>
                <td>{searchedPatient.emergencyContactPhone}</td>
              </tr>
              <tr>
                <td><strong>Relationship:</strong></td>
                <td>{searchedPatient.relationship}</td>
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
