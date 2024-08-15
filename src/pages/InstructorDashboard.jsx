import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import emptyCoursesImage from './empty-courses.png'; // Add a relevant image

const InstructorDashboard = ({ user }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/courses?instructor_id=${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user.id]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
        </div>
        <div>
          {courses.length === 0 ? (
            <div className="text-center">
              <img src={emptyCoursesImage} alt="No courses" className="mx-auto mb-4 w-1/2" />
              <h3 className="text-xl font-semibold mb-2">You have no courses yet!</h3>
              <p className="text-gray-600 mb-4">It looks like you haven't created any courses. Start creating your first course to share your knowledge!</p>
              <a href="/create-course">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Create Your First Course
                </button>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map(course => (
                <div key={course.id} className="bg-white p-4 rounded shadow">
                  <img src={course.image_url || "https://via.placeholder.com/150"} alt={course.title} className="w-full h-40 object-cover rounded mb-2" />
                  <h4 className="text-lg font-semibold">{course.title}</h4>
                  <p className="text-gray-700">{course.user.first_name} {course.user.last_name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
