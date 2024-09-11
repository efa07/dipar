import "./patientmanagmentnote.css"
import { useState } from "react";

const PatientManagmentNote = () => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [note, setNote] = useState('');
  const [notesHistory, setNotesHistory] = useState([]);

  const handleSave = () => {
    if (note.trim()) {
      setNotesHistory([
        ...notesHistory,
        { note, date: new Date().toISOString().split('T')[0] },
      ]);
      setNote('');  
    }
  };

  return (
    <div className="patient-notes-container">
      <header className="patient-notes-header">
        <h1>Patient Notes</h1>
        <button className="back-button">← Back to Dashboard</button>
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

      <div className="note-input-form">
        <h2>Add New Note</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows="5"
          placeholder="Enter patient note here..."
        />
        <button
          type="button"
          onClick={handleSave}
          className="save-button"
          disabled={!selectedPatient || !note.trim()}
        >
          Save
        </button>
      </div>

      <div className="notes-history">
        <h2>Notes History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {notesHistory.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagmentNote
