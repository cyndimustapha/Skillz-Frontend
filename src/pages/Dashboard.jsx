/* eslint-disable no-unused-vars */
import React, { useEffect, useState }from 'react';
import LearnerDashboard from './LearnersDashboard';
import InstructorDashboard from './InstructorDashboard';
import Sidebar from '../components/Sidebar';
import './Dashboard.css'; // Import custom CSS

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    fetch('http://127.0.0.1:5000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setUser(data);
      setUserRole(data.role); 
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }, []);
  
  if (!userRole) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        {userRole === 'learner' ? <LearnerDashboard user={user} /> : <InstructorDashboard user={user} />}
      </div>
    </div>
  );
};

export default Dashboard;
