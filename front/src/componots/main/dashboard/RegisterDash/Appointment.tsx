import  { useState } from 'react';
import "./ap.css"
const AppointmentSchedulingForm = () => {
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    reasonForVisit: '',
    additionalNotes: '',
  });

  const handleChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., check availability, send data to server)
    console.log(appointmentData); // For testing purposes
  };

  return (
    <div className="appointment-scheduling-form">
      <h2>Appointment Scheduling</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={appointmentData.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <select id="time" name="time" value={appointmentData.time} onChange={handleChange} required>
            <option value="">Select Time</option>
            {/* Populate options with available time slots */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reasonForVisit">Reason for Visit:</label>
          <textarea id="reasonForVisit" name="reasonForVisit" value={appointmentData.reasonForVisit} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="additionalNotes">Additional Notes:</label>
          <textarea id="additionalNotes" name="additionalNotes" value={appointmentData.additionalNotes} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Schedule Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentSchedulingForm;