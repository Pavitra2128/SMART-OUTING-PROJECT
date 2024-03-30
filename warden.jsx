import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faCheckCircle, faExclamationCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Warden = ({ children }) => {  
  return (
    <div className="container-fluid mt-1">
      <div className="row">
        <h2>Warden page</h2>
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/warden" className="nav-link active">
                <FontAwesomeIcon icon={faHourglass} /> Request
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/warden/approved" className="nav-link">
                  <FontAwesomeIcon icon={faCheckCircle} /> Approved
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/warden/rejected" className="nav-link">
                  <FontAwesomeIcon icon={faExclamationCircle} /> Rejected
                </Link>
              </li>
              <li className='nav-item'>
              <Link to="/login" className="nav-link mt-auto ml-3 ">
          <FontAwesomeIcon  icon={faArrowLeft} />   Back 
          </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="col-md-10">
          {/* Display the content of the current page */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Warden;