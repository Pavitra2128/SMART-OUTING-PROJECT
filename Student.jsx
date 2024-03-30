import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClock, faClipboard, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

const Student = () => {
  const userId = localStorage.getItem('userId');
  
  const handleLogout = () => {
    localStorage.setItem('userId', '');
    localStorage.setItem('role', '');
    localStorage.setItem('login', 'false');
    window.location.href = '/';
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar navigation */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/student" className="nav-link">
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/student/status" className="nav-link">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  Status
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/student/request" className="nav-link">
                  <FontAwesomeIcon icon={faClipboard} className="mr-2" />
                  Request
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/student/profile/${userId}`} className="nav-link">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile
                </Link>
              </li>
            </ul>
            {/* Logout button */}
            <div className="mt-auto">
              <button className="btn btn-link" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Student;
