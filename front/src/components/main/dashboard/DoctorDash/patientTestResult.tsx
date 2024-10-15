import "./ptr.css"
const patientTestResult = () => {
  return (
    <div>
        <h1>Test Result</h1>
        <form>
            <div className="mb-3">
            <label htmlFor="patientName" className="form-label">Patient Name</label>
            <input type="text" className="form-control" id="patientName" aria-describedby="patientNameHelp" />
            <div id="patientNameHelp" className="form-text">Enter the name of the patient</div>
            </div>
            <div className="mb-3">
            <label htmlFor="testName" className="form-label">Test Name</label>
            <input type="text" className="form-control" id="testName" aria-describedby="testNameHelp" />
            <div id="testNameHelp" className="form-text">Enter the name of the test</div>
            </div>
            <div className="mb-3">
            <label htmlFor="testResult" className="form-label">Test Result</label>
            <input type="text" className="form-control" id="testResult" aria-describedby="testResultHelp" />
            <div id="testResultHelp" className="form-text">Enter the result of the test</div>
            </div>
            <div className="mb-3">
            <label htmlFor="testDate" className="form-label">Test Date</label>
            <input type="date" className="form-control" id="testDate" aria-describedby="testDateHelp" />
            <div id="testDateHelp" className="form-text">Enter the date of the test</div>
            </div>
            <div className="mb-3">
            <label htmlFor="testTime" className="form-label">Test Time</label>
            <input type="time" className="form-control" id="testTime" aria-describedby="testTimeHelp" />
            <div id="testTimeHelp" className="form-text">Enter the time of the test</div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default patientTestResult
