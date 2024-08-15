// import React from 'react';
import { useNavigate } from 'react-router-dom';

const LearnersDashboard = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/coursecontent/${courseId}`);
  };

  // Example courses data
  const courses = [
    { id: '1', name: 'Course 1' },
    { id: '2', name: 'Course 2' },
    // ...other courses
  ];

  return (
    <div>
      <h1>Learners Dashboard</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <button onClick={() => handleCourseClick(course.id)}>
              {course.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearnersDashboard;
