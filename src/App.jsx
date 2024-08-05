// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/" element={<SignInForm />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
