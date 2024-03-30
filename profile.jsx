// Profile.jsx
import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faIdCard, faVenusMars, faGraduationCap, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

const StudentProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3001/student/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails(); 
  }, []);
 
  return (
    <div className="container-fluid py-5 bg-primary" style={{height:'590px'}}>
        
      <div className="container bg-white p-5 shadow rounded" style={{ maxWidth: '800px' ,maxBlockSize:'1000px'}}>

        <h1 className="text-center mb-4"><FontAwesomeIcon icon={faUser} className="mr-2" /> Profile</h1>
        {userDetails && (
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <p className="mb-1"><FontAwesomeIcon icon={faIdCard} className="mr-2" /> <strong>ID:</strong> {userDetails.id}</p>
                  <p className="mb-1"><FontAwesomeIcon icon={faUser} className="mr-2" /> <strong>Name:</strong> {userDetails.name}</p>
                  <p className="mb-1"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> <strong>Email:</strong> {userDetails.email}</p>
                  <p className="mb-1"><FontAwesomeIcon icon={faVenusMars} className="mr-2" /> <strong>Gender:</strong> {userDetails.gender}</p>
                  <p className="mb-1"><FontAwesomeIcon icon={faGraduationCap} className="mr-2" /> <strong>Branch:</strong> {userDetails.branch}</p>
                  <p className="mb-1"><FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /> <strong>Phone Number:</strong> {userDetails.phone_number}</p>
                  
                </div>
              </div>
              <div className="col-md-6">
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
