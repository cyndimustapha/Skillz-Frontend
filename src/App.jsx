import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import LearnersDashboard from './pages/LearnersDashboard';
import PaymentPage from './pages/PaymentPage';
import Sidebar from './components/Sidebar';
import './App.css'; // Ensure this includes layout styles
import MessagesPage from './pages/MessagesPage';
import { MessagesProvider } from './components/MessagesContext'; 
import Home from './pages/Home';

const App = () => {
  return (
    <MessagesProvider> 
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/dashboard" element={<LearnersDashboard />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/payment" element={<PaymentPage />} /> 
            </Routes>
          </div>
        </div>
      </Router>
    </MessagesProvider>
  );
};

export default App;

