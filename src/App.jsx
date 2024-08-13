import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import LearnersDashboard from './pages/LearnersDashboard';

import MessagesPage from './pages/MessagesPage';
import { MessagesProvider } from './components/MessagesContext'; 
import Home from './pages/Home';
import PaymentPage from './pages/PaymentPage';
import './index.css';

const App = () => {
  return (
    <MessagesProvider> 
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/dashboard" element={<LearnersDashboard />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/payment" element={<PaymentPage />} /> 
            </Routes>
          </div>
        </Router>
      </div>
    </MessagesProvider>

  );
};

export default App;
