import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlus } from 'react-icons/fa'; // Import the plus icon
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

const InstructorDashboard = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      return;
    }
    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setNewCourse({
        ...newCourse,
        image_url: data.secure_url,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newCourse,
        instructor_id: user.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses([...courses, data]);
        handleModalClose();
      })
      .catch((error) => {
        console.error('Error creating course:', error);
      });
  };

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
              <div className="flex flex-col items-center mb-4">
                <FaPlus className="text-6xl text-gray-400 mb-2" />
                <p className="text-gray-600 mb-4">It looks like you haven't created any courses. Start creating your first course to share your knowledge!</p>
                <Button variant="primary" onClick={handleModalShow}>
                  Add Your First Course
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map(course => (
                <div key={course.id} className="bg-white p-4 rounded shadow">
                  <img src={course.image_url || "https://via.placeholder.com/150"} alt={course.title} className="w-full h-40 object-cover rounded mb-2" />
                  <h4 className="text-lg font-semibold">{course.title}</h4>
                  <p className="text-gray-700">
                    {course.user ? `${course.user.first_name} ${course.user.last_name}` : 'Instructor info not available'}
                  </p>
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
              <Form.Group className="mb-3" controlId="formCourseTitle">
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
              <Form.Group className="mb-3" controlId="formCourseImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Button
                  variant="secondary"
                  onClick={handleImageUpload}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </Button>
                {newCourse.image_url && (
                  <img
                    src={newCourse.image_url}
                    alt="Course"
                    className="mt-2 w-full h-40 object-cover rounded"
                  />
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCoursePrice">
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
              <Form.Group className="mb-3" controlId="formCourseDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter course description"
                  name="description"
                  value={newCourse.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
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
