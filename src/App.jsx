import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import LearnersDashboard from './pages/LearnersDashboard';
import MessagesPage from './pages/MessagesPage';
import { MessagesProvider } from './components/MessagesContext'; 
import Home from './pages/Home';
import PaymentPage from './pages/PaymentPage';

const App = () => {
  return (
    <Router>
      <MessagesProvider> 
        <div className="App">
          <div className="content">
            <Routes>
              <Route path="/" element={<SignUpForm />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/dashboard" element={<LearnersDashboard />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/payment" element={<PaymentPage />} /> 
            </Routes>
          </div>
        </div>
      </MessagesProvider>
     
  );
};

export default App;
