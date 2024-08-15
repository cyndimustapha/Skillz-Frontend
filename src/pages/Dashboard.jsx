import { useEffect, useState } from 'react';
import LearnerDashboard from './LearnersDashboard';
import InstructorDashboard from './InstructorDashboard';
import sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage or state
    if (!token) {
      console.error('No token found');
      return;
    }
  
    fetch('http://127.0.0.1:5000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Make sure `token` contains the JWT
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
    <div>
      {userRole === 'learner' ? <LearnerDashboard user={user} /> : <InstructorDashboard user={user} />}
    </div>
  );
};

export default Dashboard;
