import { useState, ChangeEvent, FormEvent } from 'react';
import "./ap.css";

// Define a type for the form data
interface FormData {
  name: string;
  appointmentDate: string;
  appointmentTime: string;
  department: string;
  doctor: string;
  reasonForVisit: string;
  insuranceProvider: string;
  insuranceId: string;
  additionalNotes: string;
}

function AppointmentForm() {
  // Initialize state with the form data type
  const [formData, setFormData] = useState<FormData>({
    name: '',
    appointmentDate: '',
    appointmentTime: '',
    department: '',
    doctor: '',
    reasonForVisit: '',
    insuranceProvider: '',
    insuranceId: '',
    additionalNotes: '',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule appointment. Please try again.');
      }

      const result = await response.json();
      setSuccessMessage(result.message || 'Appointment scheduled successfully.');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="ap">
      <div className="appointment-form">
        <h2>Appointment Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date:</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointmentTime">Appointment Time:</label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="OPD" >OPD</option>
              <option value="radiology" >Radiology</option>
              <option value="lab" >Lab</option>
              <option value="surgery" >Surgery</option>

            </select>
          </div>
          <div className="form-group">
            <label htmlFor="doctor">Doctor:</label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
            >
              <option value="doc1" >Doctor one</option>
              <option value="doc2" >Doctor two</option>
              <option value="doc3" >Doctor thre</option>


            </select>
          </div>
          <div className="form-group">
            <label htmlFor="reasonForVisit">Reason for Visit:</label>
            <textarea
              id="reasonForVisit"
              name="reasonForVisit"
              rows={3}
              value={formData.reasonForVisit}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="insuranceProvider">Insurance Provider:</label>
            <input
              type="text"
              id="insuranceProvider"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="insuranceId">Insurance ID:</label>
            <input
              type="text"
              id="insuranceId"
              name="insuranceId"
              value={formData.insuranceId}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="additionalNotes">Additional Notes:</label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows={3}
              value={formData.additionalNotes}
              onChange={handleChange}
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <button type="submit">Schedule Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
