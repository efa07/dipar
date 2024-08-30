import "./mr.css";
import { useState, useEffect } from "react";

interface MedicalRecord {
  id: number;
  patient_name: string;
  date_of_visit: string;
  symptoms: string;
  medical_history: string;
  diagnosis: string;
  treatment_plan: string;
  created_at: string;
  updated_at: string;
  patient_id: number;
}

const MedicalRecords: React.FC = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/medical_records");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: MedicalRecord[] = await response.json();
        setMedicalRecords(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="dmr">
        <div className="medical-records">
          <h3>Medical Records</h3>
          {medicalRecords.map((record) => (
            <div key={record.id} className="medical-record-item">
              <p><strong>Date:</strong> {new Date(record.updated_at).toLocaleDateString()}</p>
              <p><strong>Patient Name:</strong> {record.patient_name}</p>
              <p><strong>Symptoms:</strong> {record.symptoms}</p>
              <p><strong>Medical History:</strong> {record.medical_history}</p>
              <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p><strong>Treatment Plan:</strong> {record.treatment_plan}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;