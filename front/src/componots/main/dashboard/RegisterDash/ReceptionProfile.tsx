import  { useState } from 'react';
import "./rp.css"

function ReceptionUserProfileSettings() {
  const [formData, setFormData] = useState({
    // ... initialize form fields here
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to the backend to update user profile
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="rp">
<div className="user-profile-settings">
      <h2>User Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
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
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Account Information */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="securityQuestion1">Security Question 1:</label>
          <select
            id="securityQuestion1"
            name="securityQuestion1"
            value={formData.securityQuestion1}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Question</option>
            {/* ... options for security questions */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="answer1">Answer 1:</label>
          <input
            type="text"
            id="answer1"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="securityQuestion2">Security Question 2:</label>
          <select
            id="securityQuestion2"
            name="securityQuestion2"
            value={formData.securityQuestion2}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Question</option>
            {/* ... options for security questions */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="answer2">Answer 2:</label>
          <input
            type="text"
            id="answer2"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
    </div>
    
  );
}

export default ReceptionUserProfileSettings;