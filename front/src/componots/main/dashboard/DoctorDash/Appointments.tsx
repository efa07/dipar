import { useEffect,useState } from "react";
import "./ap.css"
import ScaleLoader from "react-spinners/ScaleLoader"

interface appointment {

}

const Appointments = () => {
  const [appointment, setAppointment] = useState<appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchappointment = async () => {
      try {const response = await fetch("http://127.0.0.1:5000/api/appointments");
      if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: appointment[] = await response.json();
      setAppointment(data);
    } catch (err: any){
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchappointment();
}, []);

  if (loading) {
    return  <div className="d-loader" style={{color:"22ffca"}}>Loading data...
    <ScaleLoader
        color="#22ffca"
        height={100}
        loading
        radius={1}
        width={9}
      />
    </div>;
  }

  return (
    <div className="dap">
        <h1>Appointments</h1>
        {appointment.length > 0 ? (
          appointment.map((appo) => (
            <div key={appo.id} className="appointment-item">
              <p><strong>Date:</strong> {appo.appointment_date}</p>
              <p><strong>Name:</strong> {appo.name}</p>
              <p><strong>Resone to visit:</strong> {appo.reason_for_visit}</p>
              <p><strong>Description:</strong> {appo.additional_notes}</p>
              </div>
          ))
        ): (<div className="appointment-item"><p>No Appointments</p></div>)} 
    </div>
  );
};

export default Appointments
