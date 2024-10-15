import "./mlp.css";
import { useState, useEffect } from "react";

interface LabTestRequest {
  request_id: number;
  patient_id: number;
  selected_tests: string;
  notes: string;
  request_date: string;
  patient_name: string;
}

const MedicalLabPage: React.FC = () => {
  const [labTestRequests, setLabTestRequests] = useState<LabTestRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLabTestRequests = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/lab_test_requests");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: LabTestRequest[] = await response.json();
        setLabTestRequests(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLabTestRequests();
  }, []);

  const handleDelete = async (request_id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/lab_test_requests/${request_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the deleted item from the state
      setLabTestRequests(prevRequests =>
        prevRequests.filter(request => request.request_id !== request_id)
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {labTestRequests.map((request) => (
              <tr key={request.request_id}>
                <td>{request.request_id}</td>
                <td>{request.patient_name}</td>
                <td>{request.patient_id}</td>
                <td>
                  {JSON.parse(request.selected_tests).map((test: string, index: number) => (
                    <div key={index}>{test}</div>
                  ))}
                </td>
                <td>{request.notes}</td>
                <td>{new Date(request.request_date).toLocaleDateString()}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(request.request_id)} 
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalLabPage;
