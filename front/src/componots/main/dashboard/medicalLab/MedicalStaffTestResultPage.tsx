import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "./mst.css"
interface LabTestRequest {
  patient_id: number;
  patient_name: string;
  request_date: string;
  request_id: number;
  selected_tests: string;
}

interface TestResult {
  [key: string]: string; // Dynamic key for test name, value is the result
}

const LabTestResultsTable: React.FC = () => {
  const [labTestRequests, setLabTestRequests] = useState<LabTestRequest[]>([]);
  const [testResults, setTestResults] = useState<{ [key: number]: TestResult }>({});

  useEffect(() => {
    // Fetch lab test requests from the API endpoint
    const fetchLabTestRequests = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/lab_test_requests");
        const data = await response.json();
        setLabTestRequests(data);
      } catch (error) {
        console.error("Error fetching lab test requests:", error);
      }
    };

    fetchLabTestRequests();
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    requestId: number,
    testName: string
  ) => {
    const { value } = event.target;

    setTestResults((prevResults) => ({
      ...prevResults,
      [requestId]: {
        ...prevResults[requestId],
        [testName]: value,
      },
    }));
  };

  const handleSubmit = async (event: FormEvent, requestId: number) => {
    event.preventDefault();

    const resultData = {
      request_id: requestId,
      results: testResults[requestId] || {},
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/lab_test_results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultData),
      });

      if (response.ok) {
        alert(`Lab test results for Request ID ${requestId} submitted successfully.`);
        setTestResults((prevResults) => {
          const newResults = { ...prevResults };
          delete newResults[requestId]; // Clear the form for this request after submission
          return newResults;
        });
      } else {
        alert(`Failed to submit lab test results for Request ID ${requestId}.`);
      }
    } catch (error) {
      console.error(`Error submitting lab test results for Request ID ${requestId}:`, error);
      alert("An error occurred while submitting the test results.");
    }
  };

  return (
    <div className="lab-test-results-table">
      <h2>Lab Test Results</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Patient Name</th>
            <th>Patient ID</th>
            <th>Request Date</th>
            <th>Selected Tests</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {labTestRequests.map((request) => (
            <tr key={request.request_id}>
              <td>{request.request_id}</td>
              <td>{request.patient_name}</td>
              <td>{request.patient_id}</td>
              <td>{new Date(request.request_date).toLocaleString()}</td>
              <td>
                {JSON.parse(request.selected_tests).map((test: string, index: number) => (
                  <div key={index}>
                    {test}
                    <input
                      type="text"
                      placeholder={`Enter result for ${test}`}
                      value={
                        testResults[request.request_id]?.[test] || ""
                      }
                      onChange={(e) =>
                        handleInputChange(e, request.request_id, test)
                      }
                    />
                  </div>
                ))}
              </td>
              <td>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, request.request_id)}
                >
                  Send Results
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabTestResultsTable;
