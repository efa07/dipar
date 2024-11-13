import React, { useState, ChangeEvent, FormEvent } from "react";
import "./ptf.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  patientName: string;
  patientId: string; 
  labTests: string[];
  notes: string;
}

const PatientLabTestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    patientName: "",
    patientId: "",
    labTests: [],
    notes: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = event.target;
  
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        labTests: checked
          ? [...prevData.labTests, value]
          : prevData.labTests.filter((test) => test !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Format data to match the backend's expected input
    const formattedData = {
      patient_name: formData.patientName,
      patient_id: parseInt(formData.patientId, 10),  // Convert to integer
      selected_tests: formData.labTests, 
      notes: formData.notes,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/lab_test_requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        toast.success("Lab test request submitted successfully.");
        // Reset form data after successful submission
        setFormData({
          patientName: "",
          patientId: "",
          labTests: [],
          notes: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(`Failed to submit lab test request: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting lab test request:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="pt">
      <div className="form-container">
        <h2>Lab Test Request Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="patientId">Patient ID:</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Lab Test(s):</label>
            <div className="checkbox-group">
              {[
                "Complete Blood Count (CBC)",
                "Blood Glucose Test",
                "Liver Function Test (LFT)",
                "Lipid Profile",
                "Thyroid Function Test",
                "Urine Analysis",
                "Electrolyte Panel",
                "Coagulation Tests",
                "HIV Test",
                "Pregnancy Test",
                "COVID-19 Test",
                "Cholesterol Test",
                "Yellow fever",
                "malaria"
              ].map((test) => (
                <label key={test}>
                  <input
                    type="checkbox"
                    name="labTests"
                    value={test}
                    checked={formData.labTests.includes(test)}
                    onChange={handleInputChange}
                  />{" "}
                  {test}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Additional Notes:</label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Enter any additional instructions or notes..."
              value={formData.notes}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="form-group">
            <button type="submit">Submit Request</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default PatientLabTestForm;

