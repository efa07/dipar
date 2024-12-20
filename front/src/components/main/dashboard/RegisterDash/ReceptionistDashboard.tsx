import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./rdb.css";

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  city: string;
  state: string;
  zip: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  relationship: string;
  insuranceProvider?: string;
  policyNumber?: string;
  groupNumber?: string;
  allergies: string[];
  medications: string[]; 
  maritalStatus?: string;
  occupation?: string;
}


const ReceptionistDashboard: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
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
    insuranceProvider: "",
    policyNumber: "",
    groupNumber: "",
    allergies: [],
    medications: [],
    maritalStatus: "",
    occupation: "",
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'allergies' || name === 'medications') {
      setFormData({ 
        ...formData, 
        [name]: value.split(',').map(item => item.trim()) 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success("Patient registered successfully.");
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
          insuranceProvider: "",
          policyNumber: "",
          groupNumber: "",
          allergies: [],
          medications: [],
          maritalStatus: "",
          occupation: "",
        });
      } else {
        toast.error("Failed to register patient. Please try again.");
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
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="zip">ZIP Code</label>
            <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyContactName">Emergency Contact Name</label>
            <input type="text" id="emergencyContactName" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyContactPhone">Emergency Contact Phone</label>
            <input type="text" id="emergencyContactPhone" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="relationship">Relationship</label>
            <input type="text" id="relationship" name="relationship" value={formData.relationship} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="insuranceProvider">Insurance Provider</label>
            <input type="text" id="insuranceProvider" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="policyNumber">Policy Number</label>
            <input type="text" id="policyNumber" name="policyNumber" value={formData.policyNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="groupNumber">Group Number</label>
            <input type="text" id="groupNumber" name="groupNumber" value={formData.groupNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
          <label>Allergies (comma separated)</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies.join(', ')}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Medications (comma separated)</label>
            <input
              type="text"
              name="medications"
              value={formData.medications.join(', ')}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="maritalStatus">Marital Status</label>
            <input type="text" id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="occupation">Occupation</label>
            <input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} />
          </div>
          <button type="submit">Register Patient</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
