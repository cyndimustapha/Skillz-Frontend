import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import LearnersDashboard from './pages/LearnersDashboard';
import Home from './pages/Home';
import PaymentPage from './pages/PaymentPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/dashboard" element={<LearnersDashboard />} />
        <Route path="/payment" element={<PaymentPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
