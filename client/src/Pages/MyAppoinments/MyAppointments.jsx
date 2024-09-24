import React, { useEffect, useState } from 'react';
import './MyAppointments.css'; // Import your CSS for styling
import axios from '../../utils/axios'; // Adjust the path to your axios instance
import UserSidebar from '../../components/Sidebar/UserSidebar';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  console.log(appointments,"appos")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/user/all-appointments'); // Adjust the endpoint if needed
      console.log(response.data,"res")
      setAppointments(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error fetching appointments: {error}</p>;

  return (
    <div className="home">
      <UserSidebar />
      <div className="home-container">
        <h1>My Appointments</h1>

        <div className="appointments-container">
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment._id}>
                    <td>
                      {appointment.doctor.firstName}{' '}
                      {appointment.doctor.lastName}
                    </td>
                    <td>{appointment.user.name}</td>
                    <td>{new Date(appointment.date).toLocaleString()}</td>
                    <td>{appointment.status}</td>
                    <td>{appointment.reason || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
