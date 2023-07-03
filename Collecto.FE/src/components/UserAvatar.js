import React from "react";
import "./components.css";

const UserAvatar = ({ userData }) => {
  const getInitials = (fullName) => {
    const names = fullName.split(" ");
    return names.map((name) => name[0]).join("");
  };

  return (
    <span className="avatar-circle fs-3">
      {userData && userData.photo ? (
        <img src={userData.photo} alt="User Avatar" className="avatar-image" />
      ) : userData && userData.fullName ? (
        <span className="avatar-initials fs-6">{getInitials(userData.fullName)}</span>
      ) : (
        <i className="bi bi-person-circle fs-3 "></i>
      )}
    </span>
  );
};

export default UserAvatar;
