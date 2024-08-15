import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar'; // Import your Sidebar component
import 'bootstrap/dist/css/bootstrap.min.css';

const LearnersDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/enrollments')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Your Courses</h2>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.length === 0 ? (
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">You have no enrolled courses yet!</h3>
                <p className="text-gray-600 mb-4">Enroll in a course.</p>
              </div>
            ) : (
              courses.map(course => (
                <div key={course.id} className="bg-white p-4 rounded shadow">
                  <img src={course.image_url || "https://via.placeholder.com/150"} alt={course.title} className="w-full h-40 object-cover rounded mb-2" />
                  <h4 className="text-lg font-semibold">{course.title}</h4>
                  <p className="text-gray-700">{course.user.first_name} {course.user.last_name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnersDashboard;
