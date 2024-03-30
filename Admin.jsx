import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faCheckCircle, faExclamationCircle, faTachometerAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Admin = ({ children }) => {
   const navigate=useNavigate('/');
  const handleLogout = () => {
    // Clear userId and role from localStorage
    localStorage.setItem('userId', '');
    localStorage.setItem('role', '');
    navigate('/');
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <h2>Admin page</h2>
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/admin" className="nav-link active">
                  <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/approved" className="nav-link">
                  <FontAwesomeIcon icon={faCheckCircle} /> Approved
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/rejected" className="nav-link">
                  <FontAwesomeIcon icon={faExclamationCircle} /> Rejected
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/pending" className="nav-link">
                  <FontAwesomeIcon icon={faHourglass} /> Pending
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/cancelled" className="nav-link">
                  <FontAwesomeIcon icon={faExclamationCircle} /> Cancelled
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/inouting" className="nav-link">
                  <FontAwesomeIcon icon={faHourglass} /> In-Outing
                </Link>
              </li>
              {/* Logout button */}
              <li className='nav-item'>
                <button onClick={handleLogout} className="nav-link mt-auto ml-3 btn btn-link">
                  <FontAwesomeIcon icon={faArrowLeft} /> Logout
                </button>
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

export default Admin;
