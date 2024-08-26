import "./ptf.css";

const PatientLabTestForm = () => {
  return (
    <div className="pt">
<div className="form-container">
      <h2>Lab Test Request Form</h2>
      <form action="/submit-lab-test" method="post">
        <div className="form-group">
          <label htmlFor="patientName">Patient Name:</label>
          <input type="text" id="patientName" name="patientName" required />
        </div>

        <div className="form-group">
          <label htmlFor="patientId">Patient ID:</label>
          <input type="text" id="patientId" name="patientId" required />
        </div>

        <div className="form-group">
          <label>Select Lab Test(s):</label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="labTests" value="Complete Blood Count (CBC)" /> Complete Blood Count (CBC)
            </label>
            <label>
              <input type="checkbox" name="labTests" value="Blood Glucose Test" /> Blood Glucose Test
            </label>
            <label>
              <input type="checkbox" name="labTests" value="Liver Function Test (LFT)" /> Liver Function Test (LFT)
            </label>
            <label>
              <input type="checkbox" name="labTests" value="Lipid Profile" /> Lipid Profile
            </label>
            <label>
              <input type="checkbox" name="labTests" value="Thyroid Function Test" /> Thyroid Function Test
            </label>
            <label>
              <input type="checkbox" name="labTests" value="Urine Analysis" /> Urine Analysis
            </label>
            <label>
              <input type="checkbox" name="labTests" value="Electrolyte Panel" /> Electrolyte Panel
            </label>
            <label>
              <input type="checkbox" name="labTests" value="Coagulation Tests" /> Coagulation Tests
            </label>
            <label>
              <input type="checkbox" name="labTests" value="Vitamin D Test" /> Vitamin D Test
            </label>
            <label>
              <input type="checkbox" name="labTests" value="Pregnancy Test" /> Pregnancy Test
            </label>
            <label>
              <input type="checkbox" name="labTests" value="COVID-19 Test" /> COVID-19 Test
            </label>
            <label>
              <input type="checkbox" name="labTests" value="Cholesterol Test" /> Cholesterol Test
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes:</label>
          <textarea
            id="notes"
            name="notes"
            rows="4"
            placeholder="Enter any additional instructions or notes..."
          ></textarea>
        </div>
        
        <div className="form-group">
          <button type="submit">Submit Request</button>
        </div>
      </form>
    </div>
    </div>
    
  );
};

export default PatientLabTestForm;
