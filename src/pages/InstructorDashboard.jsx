// import React from 'react';
import Profile from '../components/Profile';
import CourseCard from '../components/CourseContent';

const InstructorDashboard = () => {
  const profile = {
    image: 'https://example.com/profile.jpg', // Replace with your image URL
    name: 'Bill Kiprop',
    bio: 'I am a certified martial arts instructor. Buy my course',
  };    

  const courses = [
    {
      image: 'https://example.com/course1.jpg',
      title: 'Martial Arts for Beginners',
      category: 'Martial Arts',
      rating: 4.5,
      enrolled: 23235,
      tokens: 10,
    },
    {
      image: 'https://example.com/course2.jpg',
      title: 'Intermediate Martial Arts',
      category: 'Martial Arts',
      rating: 4.7,
      enrolled: 11235,
      tokens: 15,
    },
    {
      image: 'https://example.com/course3.jpg',
      title: 'Advanced Martial Arts',
      category: 'Martial Arts',
      rating: 4.9,
      enrolled: 8350,
      tokens: 20,
    },
  ];

  return (
    <div style={styles.dashboard}>
      <Profile profile={profile} />
      <h3>COURSES:</h3>
      <div style={styles.courseList}>
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    backgroundColor: '#4a6d61',
    padding: '20px',
    minHeight: '100vh',
  },
  courseList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default InstructorDashboard;
