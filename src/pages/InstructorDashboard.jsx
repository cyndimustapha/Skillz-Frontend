/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlus } from 'react-icons/fa'; // Import the plus icon
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components
import BASE_URL from './UTILS';

const InstructorDashboard = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
  });
  const [hover, setHover] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setNewCourse({
      ...newCourse,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newCourse.title);
    formData.append('description', newCourse.description);
    formData.append('price', newCourse.price);
    formData.append('file', newCourse.image); // Use newCourse.image here
    formData.append('instructor_id', user.id);

    try {
      const response = await fetch(`${BASE_URL}/courses`, {
        method: 'POST',
        body: formData, // Do NOT set Content-Type here
      });
      const data = await response.json();
      setCourses([...courses, data]);
      handleModalClose();
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleCardClick = (courseId) => {
    navigate(`/coursecontent/${courseId}`); // Navigate to the CourseContent page
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
        </div>

        {/* Button for Adding Course */}
        <div className="mb-6 text-center">
          <Button
            style={{
              backgroundColor: hover ? '#1a4b4b' : '#183d3d',
              borderColor: '#183d3d',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleModalShow}
          >
            Add Course
          </Button>
        </div>

        <div>
          {courses.length === 0 ? (
            <div className="text-center">
              <div className="flex flex-col items-center mb-4">
                <FaPlus className="text-6xl text-gray-400 mb-2" />
                <p className="text-gray-600 mb-4">It looks like you haven't created any courses. Start creating your first course to share your knowledge!</p>
              </div>
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

        {/* Modal for Adding Course */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="courseTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter course title"
                  name="title"
                  value={newCourse.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="courseDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter course description"
                  name="description"
                  value={newCourse.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="coursePrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter course price"
                  name="price"
                  value={newCourse.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="courseImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Button
                style={{
                  backgroundColor: hover ? '#1a4b4b' : '#183d3d',
                  borderColor: '#183d3d',
                }}
                className="mt-3"
                type="submit"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Add Course
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default InstructorDashboard;
