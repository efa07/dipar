import  { useState } from 'react';
import "./ptf.css";

const PtaientLabTestForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    pid: '',
    testName: '',
    testResult: '',
    testDate: '',
    testTime: '',
  });

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Handle form data (e.g., send it to an API, log to console)
    console.log('Form data submitted:', formData);
  };

  // Function to handle input changes
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div>
      <h1>Lab Test Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="patientName" className="form-label">Patient Name</label>
          <input
            type="text"
            className="form-control"
            id="patientName"
            aria-describedby="patientNameHelp"
            value={formData.patientName}
            onChange={handleChange}
          />
          <div id="patientNameHelp" className="form-text">Enter the name of the patient</div>
        </div>
        <div className="mb-3">
          <label htmlFor="pid" className="form-label">Patient ID</label>
          <input
            type="text"
            className="form-control"
            id="pid"
            aria-describedby="pidHelp"
            value={formData.pid}
            onChange={handleChange}
          />
          <div id="pidHelp" className="form-text">Enter the patient ID</div>
        </div>
        <div className="mb-3">
          <label htmlFor="testName" className="form-label">Test Name</label>
          <input
            type="text"
            className="form-control"
            id="testName"
            aria-describedby="testNameHelp"
            value={formData.testName}
            onChange={handleChange}
          />
          <div id="testNameHelp" className="form-text">Enter the name of the test</div>
        </div>
       
        <div className="mb-3">
          <label htmlFor="testDate" className="form-label">Test Date</label>
          <input
            type="date"
            className="form-control"
            id="testDate"
            aria-describedby="testDateHelp"
            value={formData.testDate}
            onChange={handleChange}
          />
          <div id="testDateHelp" className="form-text">Enter the date of the test</div>
        </div>
        <div className="mb-3">
          <label htmlFor="testTime" className="form-label">Test Time</label>
          <input
            type="time"
            className="form-control"
            id="testTime"
            aria-describedby="testTimeHelp"
            value={formData.testTime}
            onChange={handleChange}
          />
          <div id="testTimeHelp" className="form-text">Enter the time of the test</div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PtaientLabTestForm;
