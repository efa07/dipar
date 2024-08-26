import  { useState } from 'react';
import "./ap.css"
function AppointmentForm() {
  const [formData, setFormData] = useState({
    // ... initialize all form fields here
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to the backend
    // ...
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
            <option value="" disabled>Select Department</option>
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
            <option value="" disabled>Select Doctor</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reasonForVisit">Reason for Visit:</label>
          <textarea
            id="reasonForVisit"
            name="reasonForVisit"
            rows="3"
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
            rows="3"
            value={formData.additionalNotes}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Schedule Appointment</button>
      </form>
    </div>
    </div>
    
  );
}

export default AppointmentForm;