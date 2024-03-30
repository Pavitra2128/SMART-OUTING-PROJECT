import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OutingRequest from './outing';
import Admin from './Admin';
import Dashboard from './Dashboard';
import Status from './status';
import Pending from './pending';
import Approved from './Approved';
import LoginPage from './login';
import RadioButtonGroup from './request';
import Rejected from './rejected';
import Warden from './warden';
import Studentprofile from './profile';
import InOuting from './inouting';
import ApprovedWarden from './ApprovedWarden';
import RejectedWarden from './RejectedWarden';
import WardenRequest from './WardenRequests';
import Student from './Student';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student/*" element={<StudentLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/warden/*" element={<WardenLayout />} />
      </Routes>
    </Router>
  );
};

const StudentLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Student />
        </div>
        <div className="col-md-10">
          <StudentRoutes />
        </div>
      </div>
    </div>
  );
};

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<OutingRequest />} />
      <Route path="/outingrequest" element={<OutingRequest />} />
      <Route path="/status" element={<Status />} />
      <Route path="/request" element={<RadioButtonGroup />} />
      <Route path="/profile/:id" element={<Studentprofile />} />
    </Routes>
  );
};

const AdminLayout = () => {
  return (
    <Admin>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/approved" element={<Approved />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/rejected" element={<Rejected />} />
        <Route path="/inouting" element={<InOuting />} />
      </Routes>
    </Admin>
  );
};

const WardenLayout = () => {
  return (
    <Warden>
      <Routes>
        <Route path="/" element={<WardenRequest />} />
        <Route path="/approved" element={<ApprovedWarden />} />
        <Route path="/rejected" element={<RejectedWarden />} />
      </Routes>
    </Warden>
  );
};

export default App;
