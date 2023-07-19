import React from "react";
import Navbar from "../components/Navbar";
import AdminDashboard from "../components/AdminDashboard";

const AdminDashboardLayout = () => {
  return (
    <>
      <Navbar />
      <AdminDashboard />
    </>
  );
};

export default AdminDashboardLayout;