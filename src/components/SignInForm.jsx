import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from './p5si.webp';
import TwoFactorAuth from './TwoFactorAuth';
import { BASE_URL } from '../pages/UTILS'; // ✅ Correct import

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [messages, setMessages] = useState({
    successMessage: '',
    errorMessage: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailFor2FA, setEmailFor2FA] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      const data = response.data;
      console.log('Login response:', data);

      if (response.status === 200) {
        // ✅ Save token to localStorage
        localStorage.setItem('token', data.token);

        // ✅ Optionally save user info if available
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        setMessages({ successMessage: 'Sign in successful!', errorMessage: '' });

        // ✅ Trigger 2FA modal if required
        setEmailFor2FA(formData.email);
        setIsModalOpen(true);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Login failed. Please try again.';
      setMessages({ successMessage: '', errorMessage: errorMsg });
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
        <div style={{ width: '70%', padding: '0 20px' }}>
          <h3 className="text-center mb-4 text-black">Sign In</h3>

          {messages.successMessage && (
            <div className="alert alert-success">{messages.successMessage}</div>
          )}
          {messages.errorMessage && (
            <div className="alert alert-danger">{messages.errorMessage}</div>
          )}

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
            <button type="submit" className="btn btn-dark w-100">
              Sign In
            </button>
          </form>

          <p className="text-center mt-3 text-white">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-black">
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {isModalOpen && (
        <TwoFactorAuth
          email={emailFor2FA}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => navigate('/dashboard')}
        />
      )}
    </div>
  );
};

export default SignInForm;
