import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import LearnersDashboard from './pages/LearnersDashboard';
import InstructorProfile from './components/InstructorProfile'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/learnersdashboard" element={<LearnersDashboard />} />
        <Route path="/instructorprofile" element={<InstructorProfile />} />
        <Route path="/" element={<SignInForm />} />
      </Routes>
    </Router>
  );
};

export default App;
