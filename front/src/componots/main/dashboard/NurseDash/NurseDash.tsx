import './nursedash.css';

const NurseDash = () => {
  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <section className="section patient-overview">
          <h2>Patient Overview</h2>
          <div className="patient-cards">
            {/* Patient cards would be dynamically generated here */}
          </div>
        </section>

        <section className="section tasks-reminders">
          <h2>Tasks & Reminders</h2>
          <ul>
            <li>Check patient's vitals</li>
            <li>Administer medications</li>
            <li>Update patient records</li>
            {/* More tasks and reminders */}
          </ul>
        </section>

        <section className="section medication-administration">
          <h2>Medication Administration</h2>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {/* Rows for each medication administration record */}
            </tbody>
          </table>
        </section>

        <section className="section upcoming-appointments">
          <h2>Upcoming Appointments</h2>
          {/* List of upcoming appointments */}
        </section>

        <section className="section messages">
          <h2>Messages</h2>
          {/* Quick view of recent messages */}
        </section>
      </main>
    </div>
  );
};

export default NurseDash;
