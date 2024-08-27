import  { useState } from 'react';
import './nursepatient.css';

const VitalSigns = () => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [vitalSigns, setVitalSigns] = useState({
    temperature: '',
    heartRate: '',
    bloodPressure: '',
    respiratoryRate: '',
    oxygenSaturation: '',
  });
  const [vitalSignsHistory, setVitalSignsHistory] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVitalSigns({ ...vitalSigns, [name]: value });
  };

  const handleSave = () => {
    setVitalSignsHistory([
      ...vitalSignsHistory,
      { ...vitalSigns, date: new Date().toISOString().split('T')[0] },
    ]);

    // Reset the form fields
    setVitalSigns({
      temperature: '',
      heartRate: '',
      bloodPressure: '',
      respiratoryRate: '',
      oxygenSaturation: '',
    });
  };

  return (
    <div className="vital-signs-container">
      <header className="vital-signs-header">
        <h1>Vital Signs</h1>
        <button className="back-button">← Back to Dashboard</button>
      </header>

      <div className="patient-selector">
        <label>Select Patient:</label>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
        >
          <option value="">-- Select Patient --</option>
          <option value="patient1">Abebe abebe</option>
          <option value="patient2">kebede beyene</option>
        </select>
      </div>

      <div className="vital-signs-form">
        <h2>Record New Vital Signs</h2>
        <form>
          <div className="form-group">
            <label>Temperature (°C):</label>
            <input
              type="number"
              name="temperature"
              value={vitalSigns.temperature}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Heart Rate (bpm):</label>
            <input
              type="number"
              name="heartRate"
              value={vitalSigns.heartRate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Blood Pressure (mmHg):</label>
            <input
              type="text"
              name="bloodPressure"
              value={vitalSigns.bloodPressure}
              onChange={handleInputChange}
              placeholder="Systolic/Diastolic"
            />
          </div>
          <div className="form-group">
            <label>Respiratory Rate (breaths/min):</label>
            <input
              type="number"
              name="respiratoryRate"
              value={vitalSigns.respiratoryRate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Oxygen Saturation (%):</label>
            <input
              type="number"
              name="oxygenSaturation"
              value={vitalSigns.oxygenSaturation}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="save-button"
            disabled={!selectedPatient || !vitalSigns.temperature || !vitalSigns.heartRate || !vitalSigns.bloodPressure || !vitalSigns.respiratoryRate || !vitalSigns.oxygenSaturation}
          >
            Save
          </button>
        </form>
      </div>

      <div className="vital-signs-history">
        <h2>Vital Signs History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Temperature (°C)</th>
              <th>Heart Rate (bpm)</th>
              <th>Blood Pressure (mmHg)</th>
              <th>Respiratory Rate (breaths/min)</th>
              <th>Oxygen Saturation (%)</th>
            </tr>
          </thead>
          <tbody>
            {vitalSignsHistory.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.temperature}</td>
                <td>{entry.heartRate}</td>
                <td>{entry.bloodPressure}</td>
                <td>{entry.respiratoryRate}</td>
                <td>{entry.oxygenSaturation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VitalSigns;
