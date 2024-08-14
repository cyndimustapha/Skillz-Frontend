/* eslint-disable no-unused-vars */
import React from 'react';
import Sidebar from '../components/Sidebar'; // Import your Sidebar component
import  { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LearnersDashboard.css'; // Import custom CSS if needed

const LearnersDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar Component */}
      <Sidebar />

     
    </div>
  );
};

export default LearnersDashboard;
