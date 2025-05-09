import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './app/modules/auth/pages/SignUp';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp/>} />
      </Routes>
    </Router>
  );
};

export default App;
