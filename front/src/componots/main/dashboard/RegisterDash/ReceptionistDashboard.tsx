import { useState } from 'react';
import "./rdb.css";

const ReceptionistDashboard = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    city: "",
    state: "",
    zip: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    relationship: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/api/patients', {  // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Patient registered successfully!")
        setFormData({
          firstName: "",
          lastName: "",
          dob: "",
          gender: "",
          email: "",
          city: "",
          state: "",
          zip: "",
          emergencyContactName: "",
          emergencyContactPhone: "",
          relationship: "",
        });
      } else {
        alert("Registration failed")
      }
    } catch (error) {
      console.error('Error occurred while registering:', error);
    }
  };

  return (
    <div className="con">
      <div className="form-container">
        <h2>Patient Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip Code</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              pattern="[0-9]{5}"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyContactName">Emergency Contact Name</label>
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
            <label htmlFor="emergencyContactPhone">Emergency Contact Phone</label>
            <input
              type="tel"
              id="emergencyContactPhone"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="relationship">Relationship</label>
            <input
              type="text"
              id="relationship"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Register Patient</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
