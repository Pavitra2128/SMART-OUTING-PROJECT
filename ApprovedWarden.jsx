import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApprovedWarden = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/approved-requests2");
      setUserData(result.data);
    } catch (error) {
      console.error('Error fetching approved user data:', error.message);
    }
  };
  const formatDateTimeToAMPM = (dateTimeString) => {
    if (!dateTimeString) return "";
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString('en-US');
    const formattedTime = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return `${formattedDate} ${formattedTime}`;
  };
  return (
    <div className="container mt-1">
      <h2>Approved</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Branch</th>
              <th>Out Date</th>
              <th>In Date</th>
              <th>Reason</th>
              <th>Going With</th>
              <th>Hostel Name</th>
              <th>room no</th>
              <th>Mother's Phone</th>
              <th>Father's Phone</th>
              
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.branch}</td>
                <td>{formatDateTimeToAMPM(user.from_date)}</td>
                <td>{formatDateTimeToAMPM(user.to_date)}</td>
                <td>{user.reason}</td>
                <td>{user.going_with}</td>
                <td>{user.hostel_name}</td>
                <td>{user.room_no}</td>
                <td>{user.mother_phone}</td>
                <td>{user.father_phone}</td>

                
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedWarden;
