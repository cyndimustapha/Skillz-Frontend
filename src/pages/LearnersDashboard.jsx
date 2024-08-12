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

      <div className="content-container">
        <div className="header">
          <h2>Dashboard</h2>
        </div>
        <div className="content">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: '1 1 calc(33.333% - 20px)', backgroundColor: '#ffffff', padding: '10px', borderRadius: '5px' }}>
              <img src="https://via.placeholder.com/150" alt="Cooking For Beginners" style={{ width: '100%', borderRadius: '5px' }} />
              <h4>Cooking For Beginners</h4>
              <p>Bill Kiprop</p>
            </div>
            <div style={{ flex: '1 1 calc(33.333% - 20px)', backgroundColor: '#ffffff', padding: '10px', borderRadius: '5px' }}>
              <img src="https://via.placeholder.com/150" alt="Painting Landscapes" style={{ width: '100%', borderRadius: '5px' }} />
              <h4>Painting Landscapes</h4>
              <p>Bill Kiprop</p>
            </div>
            <div style={{ flex: '1 1 calc(33.333% - 20px)', backgroundColor: '#ffffff', padding: '10px', borderRadius: '5px' }}>
              <img src="https://via.placeholder.com/150" alt="Fighting Back" style={{ width: '100%', borderRadius: '5px' }} />
              <h4>Fighting Back</h4>
              <p>Bill Kiprop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnersDashboard;
