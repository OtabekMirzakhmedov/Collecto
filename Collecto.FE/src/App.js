import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from './layouts/MainLayout';
import CreateCollectionPage from './components/CreateCollectionPage';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-collection" element={<CreateCollectionPage />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
}

export default App;
