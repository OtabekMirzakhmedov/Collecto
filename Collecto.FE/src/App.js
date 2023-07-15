import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from './layouts/MainLayout';
import CreateCollectionLayout from './layouts/CreateCollectionLayout';
import CollectionLayout from './layouts/CollectionLayout';
import EditCollectionLayout from './layouts/EditCollectionLayout';
import MyCollectionLayout from './layouts/MyCollectionLayout';
import ItemLayout from './layouts/ItemLayout';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-collection" element={<CreateCollectionLayout/>} />
        <Route path="/collections/:collectionId" element={<CollectionLayout/>} />
        <Route path="/edit-collection" element={<EditCollectionLayout />} />
        <Route path="/my-collections" element={<MyCollectionLayout/>}/>
        <Route path="/collections/:collectionId/:itemId" element={<ItemLayout/>}/>
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
}

export default App;
