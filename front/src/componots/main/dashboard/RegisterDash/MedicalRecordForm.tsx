import { useState } from 'react';
import "./mr.css"
const MedicalRecordForm = () => {
  const [medicalRecordData, setMedicalRecordData] = useState({
    patientName: '',
    patientId: '',
    dateOfVisit: '',
    symptoms: '',
    medicalHistory: '',
    diagnosis: '',
    treatmentPlan: '',
  });

  const handleChange = (e) => {
    setMedicalRecordData({ ...medicalRecordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(medicalRecordData); 
  };

  return (
    <div className="mr">
<div className="medical-record-form">
      <h2>Medical Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patientName">Patient Name:</label>
          <input type="text" id="patientName" name="patientName" value={medicalRecordData.patientName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="patientId">Patient ID:</label>
          <input type="text" id="patientId" name="patientId" value={medicalRecordData.patientId} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfVisit">Date of Visit:</label>
          <input type="date" id="dateOfVisit" name="dateOfVisit" value={medicalRecordData.dateOfVisit} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="symptoms">Symptoms:</label>
          <textarea id="symptoms" name="symptoms" value={medicalRecordData.symptoms} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="medicalHistory">Medical History:</label>
          <textarea id="medicalHistory" name="medicalHistory" value={medicalRecordData.medicalHistory} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="diagnosis">Diagnosis:</label>
          <textarea id="diagnosis" name="diagnosis" value={medicalRecordData.diagnosis} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="treatmentPlan">Treatment Plan:</label>
          <textarea id="treatmentPlan" name="treatmentPlan" value={medicalRecordData.treatmentPlan} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Save Medical Record</button>
      </form>
    </div>
    </div>
    
  );
};

export default MedicalRecordForm;