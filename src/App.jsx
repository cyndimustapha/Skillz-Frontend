import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import LearnersDashboard from './pages/LearnersDashboard';
import Browser from './pages/Browser' 
import MessagesPage from './pages/MessagesPage';
import { MessagesProvider } from './components/MessagesContext'; 
import Home from './pages/Home';
import PaymentPage from './pages/PaymentPage';
import './index.css';
import Profile from './pages/InstructorProfile';
import InstructorProfile from './components/InstructorProfile'; 

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
              <Route path="/learnersdashboard" element={<LearnersDashboard />} />
              <Route path="/instructorprofile" element={<InstructorProfile />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/browser' element={< Browser/>}/>
              {/* Home component should be rendered through a Route */}
              <Route path="/home" element={<Home />} />
            </Routes> 
          </div>
        </Router>
      </div>
    </MessagesProvider>

  );
};

export default App;