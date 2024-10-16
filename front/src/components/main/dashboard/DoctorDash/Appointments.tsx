import { useEffect, useState } from "react";
import "./ap.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Appointment {
  id: number;
  appointment_date: string;
  name: string;
  reason_for_visit: string;
  additional_notes: string;
  status?: string;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/appointments");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Appointment[] = await response.json();
        setAppointments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Function to mark an appointment as done
  const markAsDone = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/appointments/${id}/done`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Update the state to appointment is done
      setAppointments((prevAppointments) =>
        prevAppointments.map((appo) =>
          appo.id === id ? { ...appo, status: 'done' } : appo,
          toast.success("Appointment Done.")
        
      ));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Function to cancel an appointment
  const cancelAppointment = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/appointments/${id}/cancel`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Update the state to appointment is canceled
      setAppointments((prevAppointments) =>
        prevAppointments.map((appo) =>
          appo.id === id ? { ...appo, status: 'canceled' } : appo,
          toast.error("Appointment canceled.")
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="d-loader" style={{ color: "#22ffca" }}>
        Loading data...
        <ScaleLoader color="#22ffca" height={100} loading radius={1} width={9} />
      </div>
    );
  }

  return (
    <div className="dap">
      <h1>Appointments</h1>
      {appointments.length > 0 && appointments.find(s => s.status === "pending") ? (
        appointments.map((appo) => (
          <div key={appo.id} className="appointment-item">
            <p><strong>Date:</strong> {appo.appointment_date}</p>
            <p><strong>Name:</strong> {appo.name}</p>
            <p><strong>Reason to visit:</strong> {appo.reason_for_visit}</p>
            <p><strong>Description:</strong> {appo.additional_notes}</p>
            {appo.status && <p><strong>Status:</strong> {appo.status}</p>}
            <div className="button-group">
              <button
                onClick={() => markAsDone(appo.id)}
                className="btn bg-success text-white"
                disabled={appo.status === 'done' || appo.status === 'canceled'}
              >
                Done
              </button>
              <button
                onClick={() => cancelAppointment(appo.id)}
                className="btn bg-danger text-white"
                disabled={appo.status === 'done' || appo.status === 'canceled'}
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="appointment-item"><p>No Appointments</p></div>
      )}
       <ToastContainer 
         
        />
    </div>
  );
};

export default Appointments;
