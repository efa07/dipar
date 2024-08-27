import "./mlp.css";

const MedicalLabPage = () => {
  // Sample data to represent lab test requests. Replace this with data fetched from a backend API.
  const labTestRequests = [
    {
      requestId: "REQ12345",
      patientName: "John Doe",
      patientId: "PAT001",
      labTests: ["Complete Blood Count (CBC)", "Blood Glucose Test"],
      notes: "Patient is fasting.",
      requestDate: "2024-08-27",
    },
    {
      requestId: "REQ12346",
      patientName: "Jane Smith",
      patientId: "PAT002",
      labTests: ["Liver Function Test (LFT)", "Thyroid Function Test"],
      notes: "Check for thyroid levels.",
      requestDate: "2024-08-27",
    },
  ];

  return (
    <div className="mlp">
      <div className="table-container">
        <h2>Lab Test Requests</h2>
        <table className="lab-test-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Patient Name</th>
              <th>Patient ID</th>
              <th>Requested Tests</th>
              <th>Additional Notes</th>
              <th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {labTestRequests.map((request) => (
              <tr key={request.requestId}>
                <td>{request.requestId}</td>
                <td>{request.patientName}</td>
                <td>{request.patientId}</td>
                <td>{request.labTests.join(", ")}</td>
                <td>{request.notes}</td>
                <td>{request.requestDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalLabPage;
