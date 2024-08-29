import { useState, ChangeEvent, FormEvent } from 'react';
import "./mr.css"

interface FormData {
  patientName: string;
  patientId: string;
  dateOfVisit: string;
  symptoms: string;
  medicalHistory: string;
  diagnosis: string;
  treatmentPlan: string;
}

const MedicalRecordForm = () => {
  const [medicalRecordData, setMedicalRecordData] = useState<FormData>({
    patientName: '',
    patientId: '',
    dateOfVisit: '',
    symptoms: '',
    medicalHistory: '',
    diagnosis: '',
    treatmentPlan: '',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setMedicalRecordData({ ...medicalRecordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/medical_records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicalRecordData),
      });

      if (!response.ok) {
        alert("Failed to save medical record. Please try again.");
        throw new Error('Failed to save medical record. Please try again.');
      }

      const result = await response.json();
      alert("Medical record saved successfully.");
      setSuccessMessage(result.message || 'Medical record saved successfully.');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="mr">
      <div className="medical-record-form">
        <h2>Medical Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={medicalRecordData.patientName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="patientId">Patient ID:</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={medicalRecordData.patientId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfVisit">Date of Visit:</label>
            <input
              type="date"
              id="dateOfVisit"
              name="dateOfVisit"
              value={medicalRecordData.dateOfVisit}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="symptoms">Symptoms:</label>
            <textarea
              id="symptoms"
              name="symptoms"
              value={medicalRecordData.symptoms}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="medicalHistory">Medical History:</label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              value={medicalRecordData.medicalHistory}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="diagnosis">Diagnosis:</label>
            <textarea
              id="diagnosis"
              name="diagnosis"
              value={medicalRecordData.diagnosis}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="treatmentPlan">Treatment Plan:</label>
            <textarea
              id="treatmentPlan"
              name="treatmentPlan"
              value={medicalRecordData.treatmentPlan}
              onChange={handleChange}
            ></textarea>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <button type="submit">Save Medical Record</button>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordForm;
