/* eslint-disable no-unused-vars */
import React from 'react';
import Sidebar from '../components/Sidebar'; // Import your Sidebar component
import 'bootstrap/dist/css/bootstrap.min.css';
import './LearnersDashboard.css'; // Import custom CSS if needed

const LearnersDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar Component */}
      <Sidebar />

     
    </div>
  );
};

export default LearnersDashboard;
