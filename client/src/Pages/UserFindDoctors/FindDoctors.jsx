import React, { useState, useEffect } from 'react';
import './FindDoctors.css';
import UserSidebar from '../../components/Sidebar/UserSidebar';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const FindDoctors = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    doctors: [],
    hospitals: [],
    departments: [],
  });
  const [isSearching, setIsSearching] = useState(false); // To track search status
  const navigate = useNavigate();

  // Function to perform search (with or without query)
  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/user/search?q=${query}`
      );
      setResults(response.data);
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsSearching(false);
    }
  };

  const handleDoctorClick = (doctorId, hospitalId, departmentId) => {
    navigate(`/user/make-appointment/${doctorId}`, {
      state: { doctorId, hospitalId, departmentId },
    });
  };

  const handleChange = (e) => {
    setQuery(e.target.value); // Update query on input change
  };

  // Trigger search on query change and also load all results when input is empty
  useEffect(() => {
    handleSearch(); // Always fetch data on load and on query change
  }, [query]);

  return (
    <div className="home">
      <UserSidebar />
      <div className="home-container">
        <h1>Find Doctors</h1>

        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by doctors, hospitals, or departments..."
              value={query}
              onChange={handleChange} // Call handleChange on input change
            />
          </div>

          {isSearching ? (
            <p>Searching...</p>
          ) : (
            <div className="results">
              <h2>Search Results</h2>

              {/* Doctors List */}
              <div className="doctor-list">
                <h3>Doctors</h3>
                {
                // results.doctors.length > 0 ? (
                  results.doctors.map((doctor) => (
                    <div
                      key={doctor._id}
                      className="doctor-card"
                      onClick={() =>
                        handleDoctorClick(
                          doctor._id,
                          doctor.hospital?._id,
                          doctor.department?._id
                        )
                      }
                    >
                      <img
                        src={doctor.image}
                        alt={`${doctor.firstName} ${doctor.lastName}`}
                      />
                      <h4>
                        {doctor.firstName} {doctor.lastName}
                      </h4>
                      <p>Qualification: {doctor.qualification}</p>
                    </div>
                  ))
                // ) : (
                //   <p>No doctors found</p>
                // )
                }
              </div>

              {/* Hospitals List */}
              <div className="hospital-list">
                <h3>Hospitals</h3>
                {
                // results.hospitals.length > 0 ? (
                  results.hospitals.map((hospital) => (
                    <div key={hospital._id} className="hospital-card">
                      <h4>{hospital.name}</h4>
                    </div>
                  ))
                // ) : (
                //   <p>No hospitals found</p>
                // )
            }
              </div>

              {/* Departments List */}
              <div className="department-list">
                <h3>Departments</h3>
                {
                // results.departments.length > 0 ? (
                  results.departments.map((department) => (
                    <div key={department._id} className="department-card">
                      <h4>{department.name}</h4>
                    </div>
                  ))
                // ) : (
                //   <p>No departments found</p>
                // )
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindDoctors;
