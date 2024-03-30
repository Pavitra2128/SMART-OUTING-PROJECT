import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pending = () => {
  const [userData, setUserData] = useState([]);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/pending-requests");
      setUserData(result.data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const handleApprove = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to approve this request?");
    if (confirmed) {
      try {
        await axios.put(`http://localhost:3001/approve-request/${userId}`);
        fetchData();
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
        await axios.put(`http://localhost:3001/reject-request/${userId}, { reason }`);
        fetchData();
      } catch (error) {
        console.error('Error rejecting request:', error.message);
      }
    }
  };

  const pendingRequests = userData.filter(user => user.status === 'pending');

  return (
    <div>
      <h1>User Details</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>S.no</th>
              <th>Full Name</th>
              <th>Branch</th>
              <th>Out Date</th>
              <th>In Date</th>
              <th>Reason</th>
              <th>Going With</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((user, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.branch}</td>
                <td>{user.from_date}</td>
                <td>{user.to_date}</td>
                <td>{user.reason}</td>
                <td>{user.going_with}</td>
                <td>
                  <button className="btn btn-success mr-2" onClick={() => handleApprove(user.id)}>Approve</button>
                  <button className="btn btn-danger" onClick={() => handleReject(user.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pending;