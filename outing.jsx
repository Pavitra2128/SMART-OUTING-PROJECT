import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClock, faClipboard, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

const OutingRequest = () => {
  const userId = localStorage.getItem('userId');

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main content */}
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h1 className="my-3">Outing Requests</h1>
              <p className="lead">All your requests in one place</p>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <Link to="/student/request" className="btn btn-lg btn-primary">Create Outing Request ➤</Link>
              </div>
              <p className="lead text-center">No active requests!</p>
            </div>
          </div>
          <Instructions />
        </main>
      </div>
    </div>
  );
};

function Instructions() {
  return (
    <div className="card border-0 shadow-sm mt-4">
      <div className="card-body">
        <h2 className="text-primary mb-4">Instructions</h2>
        <p>Check out is permitted starting one hour before the requested time.</p>
        <p><strong>Outing types:</strong></p>
        <ul className="list-unstyled">
          <li><strong>Out-city:</strong> More than 1 day when traveling out of the city.</li>
          <li><strong>Local:</strong> Single day outing (Within city 9AM - 6PM).</li>
          <li><strong>Temporary Day Scholar:</strong> Temporarily become a day scholar for some days.</li>
          <li><strong>Official:</strong> Campus admin will declare it, and you can apply for it when available.</li>
        </ul>
      </div>
    </div>
  );
}

const handleLogout = () => {
  localStorage.setItem('userId', '');
  localStorage.setItem('role', '');
  window.location.href = '/'; 
};

export default OutingRequest;
