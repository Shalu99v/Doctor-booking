import React from 'react';
import './DocHome.css';
import Sidebar from '../../components/Sidebar/Sidebar';

const DocHome = () => {
    const appointments = [
        { patientName: 'Jane Smith', date: '2024-09-30', time: '10:00 AM', status: 'Confirmed' },
        { patientName: 'Mark Johnson', date: '2024-09-30', time: '11:00 AM', status: 'Pending' },
    ];

    const doctorProfile = {
        name: 'Dr. John Doe',
        qualification: 'MD in Cardiology',
        email: 'johndoe@example.com',
        experience: '10 years',
        image: 'doctor-image.jpg', // Replace with actual image path
    };

    return (
      <div className="home">
        <Sidebar/>
        <div className="home-container">
        <div className="doctor-home">
          <h1>Doctor Home</h1>

            <main className="main-content">
                <header>
                    <h1>Welcome, {doctorProfile.name}</h1>
                </header>

                <section className="appointments">
                    <h2>Upcoming Appointments</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{appointment.patientName}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="profile-summary">
                    <h2>Profile Summary</h2>
                    <div className="profile-info">
                        <img src={doctorProfile.image} alt={`${doctorProfile.name}'s Profile`} />
                        <div>
                            <h3>{doctorProfile.name}</h3>
                            <p>Qualification: {doctorProfile.qualification}</p>
                            <p>Email: {doctorProfile.email}</p>
                            <p>Experience: {doctorProfile.experience}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
        </div>
      </div>
       
    );
};

export default DocHome;
