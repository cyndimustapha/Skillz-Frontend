import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from './p5si.webp'; 

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [messages, setMessages] = useState({
    successMessage: '',
    errorMessage: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages({ successMessage: 'Sign In successful', errorMessage: '' });
        // Save the JWT token in localStorage or a context
        localStorage.setItem('token', data.token);
        // Redirect to dashboard or other protected route
        navigate('/dashboard');
      } else {
        setMessages({ successMessage: '', errorMessage: data.message });
      }
    } catch (error) {
      setMessages({ successMessage: '', errorMessage: 'An error occurred. Please try again.' });
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
          <h3 className="text-center mb-4 text-black">Sign In</h3>
          {messages.successMessage && <div className="alert alert-success">{messages.successMessage}</div>}
          {messages.errorMessage && <div className="alert alert-danger">{messages.errorMessage}</div>}
          <form onSubmit={handleSubmit}>
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
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">Sign In</button>
          </form>
          <p className="text-center mt-3 text-white">
            Do not have an account? <Link to="/signup" className="text-black">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
