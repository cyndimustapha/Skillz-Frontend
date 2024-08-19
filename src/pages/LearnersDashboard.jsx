import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Sidebar from '../components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import BASE_URL from './UTILS';

const LearnersDashboard = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    console.log('Fetching enrollments for learner...');
    fetch(`${BASE_URL}/enrollments?learner_id=${user.id}`)
      .then((response) => {
        if (response.ok) {
          // Check if response is JSON
          return response.json();
        } else {
          return response.text().then(text => {
            throw new Error(`Unexpected response format: ${text}`);
          });
        }
      })
      .then((data) => {
        console.log('Fetched enrollments data:', data);
        setEnrollments(data);

        // Fetch course details
        const courseIds = data.map(enrollment => enrollment.course_id);
        if (courseIds.length > 0) {
          Promise.all(courseIds.map(courseId =>
            fetch(`${BASE_URL}/courses/${courseId}`)
              .then(response => {
                if (response.ok) {
                  // Check if response is JSON
                  return response.json();
                } else {
                  return response.text().then(text => {
                    throw new Error(`Unexpected response format: ${text}`);
                  });
                }
              })
          ))
          .then(coursesData => {
            console.log('Fetched courses data:', coursesData);
            setCourses(coursesData);
          })
          .catch(error => {
            console.error('Error fetching course details:', error);
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching enrollments data:', error);
      });
  }, [user.id]);

  const handleExploreCourses = () => {
    navigate('/browser'); // Redirect to explore courses page
  };

  const handleCardClick = (courseId) => {
    navigate(`/coursecontent/${courseId}`); // Redirect to CourseContent page
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Your Courses</h2>
        </div>
        <div>
          {courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <FaPlus className="text-6xl text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">You have no enrolled courses yet!</h3>
              <p className="text-gray-600 mb-4">Enroll in a course.</p>
              <button
                onClick={handleExploreCourses}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Explore Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map(course => (
                <div
                  key={course.id}
                  className="bg-white p-4 rounded shadow cursor-pointer" // Add cursor-pointer class
                  onClick={() => handleCardClick(course.id)} // Handle card click
                >
                  <img
                    src={course.image_url || "https://via.placeholder.com/150"}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <h4 className="text-lg font-semibold">{course.title}</h4>
                  <p className="text-gray-700">{course.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnersDashboard;
