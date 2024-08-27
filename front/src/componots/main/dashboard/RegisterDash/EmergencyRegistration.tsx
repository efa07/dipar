import  { useState } from 'react';
import "./er.css"
function EmergencyRegistrationForm() {
  const [formData, setFormData] = useState({
    // ... initialize all form fields here
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to the backend
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="emr">
<div className="emergency-form">
      <h2>Emergency Registration Form</h2>
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
          <label htmlFor="emergencyContactName">Emergency Contact Name:</label>
          <input
            type="text"
            id="emergencyContactName"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="allergies">Allergies:</label>
          <textarea
            id="allergies"
            name="allergies"
            rows="3"
            value={formData.allergies}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="symptoms">Symptoms:</label>
          <textarea
            id="symptoms"
            name="symptoms"
            rows="5"
            value={formData.symptoms}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    
  );
}

export default EmergencyRegistrationForm;