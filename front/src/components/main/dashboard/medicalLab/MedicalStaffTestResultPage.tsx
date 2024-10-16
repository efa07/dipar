import React, { useState, ChangeEvent, FormEvent } from "react";
import "./mst.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TestResult {
  test_name: string;
  result: string;
  comments: string;
}

interface FormData {
  request_id: string;
  test_results: TestResult[];
}

const MedicalStaffTestResultPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    request_id: "",
    test_results: [{ test_name: "", result: "", comments: "" }],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index: number) => {
    const { name, value } = event.target;
    if (name === "request_id") {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      const updatedTestResults = [...formData.test_results];
      updatedTestResults[index] = {
        ...updatedTestResults[index],
        [name]: value,
      };
      setFormData(prevData => ({
        ...prevData,
        test_results: updatedTestResults,
      }));
    }
  };

  const addTestResult = () => {
    setFormData(prevData => ({
      ...prevData,
      test_results: [...prevData.test_results, { test_name: "", result: "", comments: "" }],
    }));
  };

  const removeTestResult = (index: number) => {
    setFormData(prevData => ({
      ...prevData,
      test_results: prevData.test_results.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (isNaN(parseInt(formData.request_id, 10))) {
      setError("Request ID must be a valid number");
      setIsLoading(false);
      return;
    }

    const formattedData = {
      request_id: parseInt(formData.request_id, 10),
      test_results: formData.test_results,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/lab_test_results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        toast.success("Lab test results submitted successfully!");
        setFormData({
          request_id: "",
          test_results: [{ test_name: "", result: "", comments: "" }],
        });
      } else {
        const errorData = await response.json();
        setError(`Failed to submit lab test results: ${errorData.error}`);
        toast.error(`Failed to submit lab test results: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting lab test results:", error);
      setError("An error occurred while submitting the form.");
      toast.error("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  const testNameOptions = [
    "Complete Blood Count (CBC)",
    "Blood Glucose Test",
    "Liver Function Test (LFT)",
    "Lipid Profile",
    "Thyroid Function Test",
    "Urine Analysis",
    "Electrolyte Panel",
    "Coagulation Tests",
    "Vitamin D Test",
    "Pregnancy Test",
    "COVID-19 Test",
    "Cholesterol Test",
  ];

  return (
    <div className="pt">
      <div className="form-container">
        <h2>Lab Test Results Form</h2>
        {error && <div className="error-message" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="request_id">Request ID:</label>
            <input
              type="text"
              id="request_id"
              name="request_id"
              value={formData.request_id}
              onChange={(e) => handleInputChange(e, 0)}
              required
              aria-required="true"
              pattern="\d+"
              title="Please enter a valid number"
            />
          </div>

          {formData.test_results.map((testResult, index) => (
            <div key={index} className="test-result-container">
              <h3>Test Result {index + 1}</h3>
              <div className="form-group">
                <label htmlFor={`test_name_${index}`}>Test Name:</label>
                <select
                  id={`test_name_${index}`}
                  name="test_name"
                  value={testResult.test_name}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                  aria-required="true"
                >
                  <option value="">Select a test</option>
                  {testNameOptions.map((test) => (
                    <option key={test} value={test}>
                      {test}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor={`result_${index}`}>Result:</label>
                <input
                  type="text"
                  id={`result_${index}`}
                  name="result"
                  value={testResult.result}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                  aria-required="true"
                  maxLength={255}
                />
              </div>

              <div className="form-group">
                <label htmlFor={`comments_${index}`}>Comments:</label>
                <textarea
                  id={`comments_${index}`}
                  name="comments"
                  rows={4}
                  placeholder="Enter any additional comments..."
                  value={testResult.comments}
                  onChange={(e) => handleInputChange(e, index)}
                ></textarea>
              </div>

              {index > 0 && (
                <button type="button" onClick={() => removeTestResult(index)} className="remove-btn btn btn-danger text-white m-1">
                  Remove Test Result
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addTestResult} className="add-btn btn btn-primary m-1">
            Add Another Test Result
          </button>

          <div className="form-group">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Results"}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default MedicalStaffTestResultPage;






