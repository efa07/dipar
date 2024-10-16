import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import "./pp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Prescription {
  id: number;
  prescription_date: string;
  medication: string;
  dosage: string;
  frequency: string;
  prescribing_doctor: string;
}

const Prescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    date: '',
    medication: '',
    dosage: '',
    frequency: '',
    doctor_id: '',  //get it from localstorage
    patient_id: ''
  });

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/prescriptions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Prescription[] = await response.json();
        setPrescriptions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();

    // Retrieve doctor_id from localStorage
    const storedDoctorId = localStorage.getItem('userId');
    if (storedDoctorId) {
      setForm((prevForm) => ({
        ...prevForm,
        doctor_id: storedDoctorId 
      }));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const prescriptionData = {
      date: form.date,
      medication: form.medication,
      dosage: form.dosage,
      frequency: form.frequency,
      doctor_id: form.doctor_id,
      patient_id: form.patient_id
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/prescriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prescriptionData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Prescription added successfully:', result);
        setForm({
          date: '',
          medication: '',
          dosage: '',
          frequency: '',
          doctor_id: form.doctor_id,
          patient_id: ''
        });
        toast.success('Prescription added successfully.');
      } else {
        const errorData = await response.json();
        console.error('Error adding prescription:', errorData.message || response.statusText);
        toast.error(`Error adding prescription: ${errorData.message || response.statusText}`);
      }
    } catch (error: any) {
      console.error('Network error:', error.message);
      toast.error('Network error: Failed to add prescription.');
    }
  };

  return (
    <div className="pre">
      <div className="prescriptions">
        <h3>Prescriptions</h3>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {prescriptions.length > 0 ? (
          prescriptions.map((pre) => (
            <div className="prescription-item" key={pre.id}>
              <p><strong>Date:</strong> {pre.prescription_date}</p>
              <p><strong>Medication:</strong> {pre.medication}</p>
              <p><strong>Dosage:</strong> {pre.dosage}</p>
              <p><strong>Frequency:</strong> {pre.frequency}</p>
              <p><strong>Prescribing Doctor:</strong> {pre.prescribing_doctor}</p>
            </div>
          ))
        ) : (
          <p>No prescriptions found.</p>
        )}
      </div>

      {/* Form for adding prescriptions */}
      <div className="add-prescription">
        <h3>Add New Prescription</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Medication:
            <input
              type="text"
              name="medication"
              value={form.medication}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Dosage:
            <input
              type="text"
              name="dosage"
              value={form.dosage}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Frequency:
            <input
              type="text"
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Prescribing Doctor ID:
            <input
              type="number"
              name="doctor_id"
              value={form.doctor_id}
              onChange={handleChange}
              disabled  // Prevent doctor from editing the doctor_id
              required
            />
          </label>
          <label>
            Patient ID:
            <input
              type="number"
              name="patient_id"
              value={form.patient_id}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Add Prescription</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Prescriptions;
