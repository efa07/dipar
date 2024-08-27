import "./mst.css";

const MedicalStaffTestResultPage = () => {
  // Sample data representing lab test requests. Replace this with actual data from a backend API.
  const labTestRequests = [
    {
      requestId: "REQ12345",
      patientName: "John Doe",
      patientId: "PAT001",
      labTests: ["Complete Blood Count (CBC)", "Blood Glucose Test"],
    },
    {
      requestId: "REQ12346",
      patientName: "Jane Smith",
      patientId: "PAT002",
      labTests: ["Liver Function Test (LFT)", "Thyroid Function Test"],
    },
    // Add more requests as needed
  ];

  // Handler function for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission, sending data to backend
    alert("Lab test results submitted successfully!");
  };

  return (
    <div className="mst">
      <div className="form-container">
        <h2>Submit Lab Test Results</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="requestSelect">Select Test Request:</label>
            <select id="requestSelect" name="requestSelect" required>
              <option value="">--Select a Request--</option>
              {labTestRequests.map((request) => (
                <option key={request.requestId} value={request.requestId}>
                  {request.patientName} - {request.requestId}
                </option>
              ))}
            </select>
          </div>

          {/* This would dynamically generate input fields based on selected tests */}
          <div className="form-group">
            <label htmlFor="cbcResult">Complete Blood Count (CBC) Result:</label>
            <input type="text" id="cbcResult" name="cbcResult" required />
          </div>

          <div className="form-group">
            <label htmlFor="glucoseResult">Blood Glucose Test Result:</label>
            <input type="text" id="glucoseResult" name="glucoseResult" required />
          </div>

          {/* Additional input fields for other tests can be added dynamically */}
          
          <div className="form-group">
            <label htmlFor="comments">Additional Comments:</label>
            <textarea
              id="comments"
              name="comments"
              rows="4"
              placeholder="Enter any additional comments or notes..."
            ></textarea>
          </div>

          <div className="form-group">
            <button type="submit">Submit Results</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalStaffTestResultPage;
