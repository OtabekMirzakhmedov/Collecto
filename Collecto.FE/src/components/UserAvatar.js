import React from "react";

const UserAvatar = ({ fullName, photoUrl }) => {
  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names
      .map((name) => name.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  return (
    <div className="user-avatar">
      {photoUrl ? (
        <img src={photoUrl} alt="User Avatar" className="avatar-img" />
      ) : (
        <div className="avatar-initials">{getInitials(fullName)}</div>
      )}
    </div>
  );
};

export default UserAvatar;
