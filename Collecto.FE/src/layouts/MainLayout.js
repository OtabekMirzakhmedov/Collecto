import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import SubjectSlider from '../components/SubjectSlider';
import Collections from '../components/Collections';

const MainLayout = () => {
  const searchQuery = useSelector((state) => state.search);

  return (
    <>
      <Navbar />
      {searchQuery ? null : <SubjectSlider />}
      <Collections />
    </>
  );
};

export default MainLayout;
