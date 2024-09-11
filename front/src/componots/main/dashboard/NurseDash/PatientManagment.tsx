import "./PatientManagment.css"
import { useState } from "react";
import {Link} from "react-router-dom"

const PatientManagment = () => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedMedication, setSelectedMedication] = useState('');
  const [administrationDetails, setAdministrationDetails] = useState({
    dosage: '',
    frequency: '',
    route: '',
    notes: '',
  });
  const [administrationHistory, setAdministrationHistory] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdministrationDetails({ ...administrationDetails, [name]: value });
  };

  const handleSave = () => {
    // Add new administration entry to the history
    setAdministrationHistory([
      ...administrationHistory,
      { ...administrationDetails, date: new Date().toISOString().split('T')[0], medication: selectedMedication },
    ]);

    // Reset the form fields
    setAdministrationDetails({
      dosage: '',
      frequency: '',
      route: '',
      notes: '',
    });
    setSelectedMedication('');
  };

  return (
    <div className="medication-administration-container">
      <header className="medication-administration-header">
        <h1>Medication Administration</h1>
        <button className="back-button">
          <Link to="/nurse/nurseDash">← Back to Dashboard</Link>
          </button>
      </header>

      <div className="patient-selector">
        <label>Select Patient:</label>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
        >
          <option value="">-- Select Patient --</option>
          <option value="patient1">patient one</option>
          <option value="patient2">patient two</option>
        </select>
      </div>

      <div className="medication-selector">
        <label>Select Medication:</label>
        <select
          value={selectedMedication}
          onChange={(e) => setSelectedMedication(e.target.value)}
        >
          <option value="">-- Select Medication --</option>
          <option value="med1">Aspirin</option>
          <option value="med2">Ibuprofen</option>
        </select>
      </div>

      <div className="administration-form">
        <h2>Administration Details</h2>
        <form>
          <div className="form-group">
            <label>Dosage (mg):</label>
            <input
              type="number"
              name="dosage"
              value={administrationDetails.dosage}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Frequency:</label>
            <input
              type="text"
              name="frequency"
              value={administrationDetails.frequency}
              onChange={handleInputChange}
              placeholder="e.g., Once a day"
            />
          </div>
          <div className="form-group">
            <label>Route:</label>
            <input
              type="text"
              name="route"
              value={administrationDetails.route}
              onChange={handleInputChange}
              placeholder="e.g., Oral, Intravenous"
            />
          </div>
          <div className="form-group">
            <label>Notes:</label>
            <textarea
              name="notes"
              value={administrationDetails.notes}
              onChange={handleInputChange}
              rows="3"
              placeholder="Additional instructions or notes"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="save-button"
            disabled={!selectedPatient || !selectedMedication || !administrationDetails.dosage || !administrationDetails.frequency || !administrationDetails.route}
          >
            Save
          </button>
        </form>
      </div>

      <div className="administration-history">
        <h2>Administration History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Medication</th>
              <th>Dosage (mg)</th>
              <th>Frequency</th>
              <th>Route</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {administrationHistory.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.medication}</td>
                <td>{entry.dosage}</td>
                <td>{entry.frequency}</td>
                <td>{entry.route}</td>
                <td>{entry.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagment
