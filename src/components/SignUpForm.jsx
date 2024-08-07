import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from './p5su.jpeg'; 

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'Instructor',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [messages, setMessages] = useState({
    successMessage: '',
    errorMessage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessages({ successMessage: '', errorMessage: 'Passwords do not match' });
    } else {
      setMessages({ successMessage: 'Registration was successful', errorMessage: '' });
      setFormData({
        firstName: '',
        lastName: '',
        role: 'Instructor',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    width: '100vw'
  };

  const imageSideStyle = {
    flex: 1,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  const formSideStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5c786a'
  };

  return (
    <div style={containerStyle}>
      <div style={imageSideStyle}></div>
      <div style={formSideStyle}>
        <div style={{ width: '100%', padding: '0 20px' }}>
          <h3 className="text-center mb-4 text-black">Sign Up</h3>
          {messages.successMessage && <div className="alert alert-success">{messages.successMessage}</div>}
          {messages.errorMessage && <div className="alert alert-danger">{messages.errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <select
                className="form-control"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Instructor">Instructor</option>
                <option value="Learner">Learner</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">Sign Up</button>
          </form>
          <p className="text-center mt-3 text-white">
            Already have an account? <Link to="/signin" className="text-black">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
