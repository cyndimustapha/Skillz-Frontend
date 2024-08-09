// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import LearnersDashboard from './pages/LearnersDashboard';
import PaymentPage from './pages/PaymentPage';
import Sidebar from './components/Sidebar';
import './App.css'; // Ensure this includes layout styles

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/dashboard" element={<LearnersDashboard />} />
            <Route path="/paymentpage" element={<PaymentPage />} />
            <Route path="/" element={<SignInForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
