import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import SubjectSlider from './components/SubjectSlider';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SubjectSlider />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  </Router>
  );
}

export default App;
