import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => (
  <div>
    <h2>Admin Dashboard</h2>
    <Link to="/attendance">Attendance Register</Link>
  </div>
);

export default AdminPage;
