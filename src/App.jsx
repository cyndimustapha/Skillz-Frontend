import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import LearnersDashboard from './pages/LearnersDashboard';
import MessagesPage from './pages/MessagesPage';
import { MessagesProvider } from './components/MessagesContext'; // Import the MessagesProvider

const App = () => {
  return (
    <Router>
      <MessagesProvider> {/* Wrap your routes with MessagesProvider */}
        <div className="App">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<SignUpForm />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/dashboard" element={<LearnersDashboard />} />
              <Route path="/messages" element={<MessagesPage />} />
            </Routes>
          </div>
        </div>
      </MessagesProvider>
    </Router>
  );
};

export default App;
