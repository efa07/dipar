import  { useState } from 'react';
import "./profile.css"
const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: 'Dr. John Doe',
    specialty: 'Cardiologist',
    contact: '123-456-7890',
    email: 'john.doe@example.com',
    bio: 'Experienced cardiologist with over 15 years of experience in heart diseases.',
    profilePicture: 'src/assets/profile.png',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newProfile, setNewProfile] = useState({ ...profile });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({
      ...newProfile,
      [name]: value,
    });
  };

  const handleSave = () => {
    setProfile(newProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewProfile({ ...profile });
    setIsEditing(false);
  };

  return (
    <div className="profile-management">
      <div className="profile-picture">
        <img src={profile.profilePicture} alt="Profile" />
      </div>
      <h2>Profile Management</h2>

      {isEditing ? (
        <div className="profile-form">
          <input
            type="text"
            name="name"
            value={newProfile.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="specialty"
            value={newProfile.specialty}
            onChange={handleChange}
            placeholder="Specialty"
          />
          <input
            type="text"
            name="contact"
            value={newProfile.contact}
            onChange={handleChange}
            placeholder="Contact"
          />
          <input
            type="email"
            name="email"
            value={newProfile.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <textarea
            name="bio"
            value={newProfile.bio}
            onChange={handleChange}
            placeholder="Bio"
          />
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Specialty:</strong> {profile.specialty}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfileManagement;
