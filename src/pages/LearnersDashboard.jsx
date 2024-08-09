import  { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', backgroundColor: '#5c786a', color: '#fff', padding: '20px', borderBottom: '1px' }}>
        <h2 style={{ color: '#ffffff' }}>SKILLZ</h2>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-black" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-black" href="/dashboard">Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-black" href="#">Chats</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-black" href="#">Notifications</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-black" href="#">Browse</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-black" href="#">Settings</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-black" href="#">Help</a>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
        <h2>Dashboard</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {courses.map((course, index) => (
            <div
              key={index}
              style={{ flex: '1 1 calc(33.333% - 20px)', backgroundColor: '#0063a3', padding: '10px', borderRadius: '5px' }}
            >
              <img src={course.imageUrl || 'https://via.placeholder.com/150'} alt={course.title} style={{ width: '100%', borderRadius: '5px' }} />
              <h4>{course.title}</h4>
              <p>{course.instructor}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnersDashboard;
