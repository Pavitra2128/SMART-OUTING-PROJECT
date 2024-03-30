import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from  'react-router-dom';

const WardenRequest = () => {
  const [userData, setUserData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('requests');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(selectedOption);
  }, [selectedOption]);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/approved-requestsWarden");
      setUserData(result.data);
    } catch (error) {
      console.error('Error fetching approved user data:', error.message);
    }
  };

  const handleApprove = async (id) => {
    const confirmed = window.confirm("Are you sure you want to approve this request?");
    if (confirmed) {
      try {
        await axios.put(`http://localhost:3001/approve-request2/${id}`);
        setUserData(prevUserData => prevUserData.filter(user => user.id !== id)); // Remove item from userData
      } catch (error) {
        console.error('Error approving request:', error.message);
      }
    }
  };


  const handleReject = async (userId) => {
    const reason = prompt("Please provide a reason for rejecting this request:");
    console.log("Reason:", reason);
    if (reason !== null) {
      try {
        await axios.put(`http://localhost:3001/reject-request2/${userId}`, { reason });
        // Refetch pending requests after rejection
        fetchData();
      } catch (error) {
        console.error('Error rejecting request:', error.message);
      }
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
    <div className="container mt-0">
      <h2>Requests</h2>
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
            <th>Mother's Phone</th>
            <th>Father's Phone</th>
            <th>Hostel Name</th>
            <th>Room No</th>
            <th>Action</th>
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
              <td>{user.mother_phone}</td>
              <td>{user.father_phone}</td>
              <td>{user.hostel_name}</td>
              <td>{user.room_no}</td>
              <td>
                <button className="btn btn-success mr-2" onClick={() => handleApprove(user.id)}>Approve</button>
                <button className="btn btn-danger" onClick={() => handleReject(user.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WardenRequest;
