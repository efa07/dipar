import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    user_id: '',
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: '',
    role: 'doctor', // default value
  });
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Basic validation (you can add more complex validation)
    if (!formData.user_id || !formData.first_name || !formData.last_name || !formData.email || !formData.password) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Signup successful!');
        setFormData({
          user_id: '',
          first_name: '',
          last_name: '',
          age: '',
          email: '',
          password: '',
          role: 'doctor',
        });
        navigate('/login');
        setErrorMessage('');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'An error occurred during signup.');
      }
    } catch (error) {
      setErrorMessage('An error occurred during signup.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user_id"
          placeholder="User ID"
          value={formData.user_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="lab_staff">Lab Staff</option>
          <option value="admin">Admin</option>
          <option value="receptionist">Receptionist</option>
        </select>
        <button type="submit">Rigister</button>
      </form>
    </div>
  );
}

export default Signup;
