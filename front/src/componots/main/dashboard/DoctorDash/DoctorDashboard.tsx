import "./doctorDashBoard.css";
import { useState, useEffect } from "react";
import Logo from "./3496352.jpg";


const DoctorDashboard = () => {
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      const data = {
        name: "Abebe Kebede",
        age: 45,
        gender: "Male",
        country: "Addis Ababa, Ethiopia",
        bloodType: "O+",
        allergies: ["Peanuts", "Penicillin"],
        contact: "+251-121-121-1",
        email: "abebe.kabe@example.com",
        appointments: [
          {
            date: "2024-05-14",
            doctor: "Dr. someone",
            notes: "Follow-up on blood pressure medication.",
          },
          {
            date: "2024-04-20",
            doctor: "Dr. Adams",
            notes: "Routine annual check-up.",
          },
        ],
        medicalRecords: [
          {
            date: "2024-03-10",
            diagnosis: "Hypertension",
            treatment: "Prescribed blood pressure medication.",
            notes: "Monitor blood pressure daily.",
          },
          {
            date: "2023-11-05",
            diagnosis: "Type 2 Diabetes",
            treatment: "Started on metformin.",
            notes: "Recommended dietary changes and exercise.",
          },
        ],
        testResults: [
          {
            date: "2024-06-01",
            type: "Blood Test",
            result: "Cholesterol levels are slightly elevated.",
            notes: "Consider dietary modifications.",
          },
          {
            date: "2024-02-15",
            type: "X-Ray",
            result: "Normal chest X-ray.",
            notes: "No abnormalities detected.",
          },
        ],
        prescriptions: [
          {
            date: "2024-06-15",
            medication: "Metformin",
            dosage: "500mg",
            frequency: "Twice daily",
            doctor: "Dr. Jones",
          },
          {
            date: "2024-05-10",
            medication: "Lisinopril",
            dosage: "10mg",
            frequency: "Once daily",
            doctor: "Dr. Smith",
          },
        ],
        ongoingTreatments: [
          {
            startDate: "2023-11-10",
            type: "Physical Therapy",
            status: "Ongoing",
            notes: "Scheduled for twice a week.",
          },
          {
            startDate: "2024-04-01",
            type: "Diabetes Management",
            status: "Active",
            notes: "Regular monitoring of blood glucose levels.",
          },
        ],
      };

      setPatientData(data);
    };

    fetchPatientData();
  }, []);

  return (
    <div className="doctor-dashboard">
      <h2>Patient Dashboard</h2>
      {patientData ? (
        <>
          <div className="patient-info">
            <h3>Patient Information</h3>
            <div className="imgName">
            <img src={Logo} alt="Patient Avatar" />
            </div>
            <div className="info">
            <p><strong>Name:</strong> {patientData.name}</p>
            <p><strong>Age:</strong> {patientData.age}</p>
            <p><strong>Gender:</strong> {patientData.gender}</p>
            <p><strong>Country:</strong> {patientData.country}</p>
            <p><strong>Blood Type:</strong> {patientData.bloodType}</p>
            <p><strong>Allergies:</strong> {patientData.allergies.join(", ")}</p>
            <p><strong>Contact:</strong> {patientData.contact}</p>
            <p><strong>Email:</strong> {patientData.email}</p>
            </div>
           
            
          </div>
          
          <div className="appointment-history">
            <h3>Appointment History</h3>
            {patientData.appointments.length > 0 ? (
              patientData.appointments.map((appointment, index) => (
                <div key={index} className="appointment-item">
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Doctor:</strong> {appointment.doctor}</p>
                  <p><strong>Notes:</strong> {appointment.notes}</p>
                </div>
              ))
            ) : (
              <p>No appointment history available.</p>
            )}
          </div>

          <div className="medical-records-history">
            <h3>Medical Records</h3>
            {patientData.medicalRecords.length > 0 ? (
              patientData.medicalRecords.map((record, index) => (
                <div key={index} className="medical-record-item">
                  <p><strong>Date:</strong> {record.date}</p>
                  <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                  <p><strong>Treatment:</strong> {record.treatment}</p>
                  <p><strong>Doctor's Notes:</strong> {record.notes}</p>
                </div>
              ))
            ) : (
              <p>No medical records available.</p>
            )}
          </div>

          <div className="test-results-history">
            <h3>Test Results</h3>
            {patientData.testResults.length > 0 ? (
              patientData.testResults.map((test, index) => (
                <div key={index} className="test-result-item">
                  <p><strong>Date:</strong> {test.date}</p>
                  <p><strong>Type:</strong> {test.type}</p>
                  <p><strong>Result:</strong> {test.result}</p>
                  <p><strong>Notes:</strong> {test.notes}</p>
                </div>
              ))
            ) : (
              <p>No test results available.</p>
            )}
          </div>

          <div className="prescriptions-history">
            <h3>Prescriptions</h3>
            {patientData.prescriptions.length > 0 ? (
              patientData.prescriptions.map((prescription, index) => (
                <div key={index} className="prescription-item">
                  <p><strong>Date:</strong> {prescription.date}</p>
                  <p><strong>Medication:</strong> {prescription.medication}</p>
                  <p><strong>Dosage:</strong> {prescription.dosage}</p>
                  <p><strong>Frequency:</strong> {prescription.frequency}</p>
                  <p><strong>Prescribing Doctor:</strong> {prescription.doctor}</p>
                </div>
              ))
            ) : (
              <p>No prescriptions available.</p>
            )}
          </div>

          <div className="ongoing-treatments">
            <h3>Ongoing Treatments</h3>
            {patientData.ongoingTreatments.length > 0 ? (
              patientData.ongoingTreatments.map((treatment, index) => (
                <div key={index} className="treatment-item">
                  <p><strong>Start Date:</strong> {treatment.startDate}</p>
                  <p><strong>Type:</strong> {treatment.type}</p>
                  <p><strong>Status:</strong> {treatment.status}</p>
                  <p><strong>Notes:</strong> {treatment.notes}</p>
                </div>
              ))
            ) : (
              <p>No ongoing treatments available.</p>
            )}
          </div>

          <div className="allergies">
            <h3>Allergies</h3>
            {patientData.allergies.length > 0 ? (
              <ul>
                {patientData.allergies.map((allergy, index) => (
                  <li key={index}>{allergy}</li>
                ))}
              </ul>
            ) : (
              <ScaleLoader
  color="#17e9b1"
  height={10}
  width={6}
/>
            )}
          </div>
        </>
      ) : (
        <ScaleLoader
  color="#17e9b1"
  height={10}
  width={6}
  
/>
      )}
    </div>
  );
};

export default DoctorDashboard;
