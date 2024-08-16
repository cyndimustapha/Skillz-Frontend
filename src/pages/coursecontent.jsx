import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseContent = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch course details from the backend using courseId
    fetch(`http://127.0.0.1:5000/courses/${courseId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setCourse(data))
      .catch((error) => {
        console.error('Error fetching course:', error);
        setError(error.message);
      });
  }, [courseId]);

  if (error) return <p>Error: {error}</p>;
  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h1>{course.name || 'Course Name Unavailable'}</h1>
      <p>{course.description || 'No description available for this course.'}</p>
      {/* Render other course details here */}
    </div>
  );
};

export default CourseContent;