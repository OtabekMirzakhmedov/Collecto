import React from 'react'
import Navbar from '../components/Navbar'
import SubjectSlider from '../components/SubjectSlider'
import Collections from '../components/Collections'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <SubjectSlider />
      <Collections />
    </>
  )
}

export default MainLayout
