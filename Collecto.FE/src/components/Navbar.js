import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import userService from "../services/userService";
import UserAvatar from "./UserAvatar";
import { Dropdown } from "react-bootstrap";

const Navbar = () => {
  console.log('Navbar');
  const [userData, setUserData] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const isLoggedIn = !!userId;

  const signOut = () => {
    console.log('Navbar sign osut');
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("userId");
    dispatch(logout());
    navigate("/");
  };



  const handleLoginClick = () => {
    console.log('Navbar handle login click');

    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleProfileClick = () => {
    navigate("/");
  };

  const handleCollectionsClick = () => {
    navigate("/my-collections");
  };

  return (
    <nav className="navbar-expand shadow-sm d-flex">
      <div className="container-fluid px-lg-5">
        <div className="d-flex justify-content-between align-content-center p-3">
          <span className="align-content-center d-none d-sm-inline-block me-lg-5 pe-lg-5">
            <a className="navbar-brand" href="/">
              <i className="bi bi-flower1 fs-3 my-1 text-danger"></i>
            </a>
            <span className="d-none d-xl-inline-block">
              <a className="navbar-brand" href="/">
                <p className="fs-2 d-inline text-danger">collecto </p>
              </a>
            </span>
          </span>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="input-group">
              <input
                className="form-control border-end-0 border rounded-start-pill focus-ring-info shadow"
                type="text"
                placeholder="search..."
              />
              <span className="input-group-append">
                <button className="btn btn-outline-secondary bg-white border rounded-end-pill shadow">
                  <i className="bi bi-search fs-5 text-danger"></i>
                </button>
              </span>
            </div>
          </div>
          <Dropdown>
            <Dropdown.Toggle
              className="btn border border-1 rounded-pill d-none d-sm-inline-block p-0 focus-ring focus-ring-light shadow-sm align-content-center"
              variant=""
            >
              {!isLoggedIn ? (
                <>
                  <i className="bi bi-person-circle fs-3 px-2"></i>
                </>
              ) : (
                <>
                  <i className="bi bi-person-circle fs-3 px-2"></i>
                </>
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {!isLoggedIn && (
                <Dropdown.Item onClick={handleLoginClick}>
                  Log in
                </Dropdown.Item>
              )}
              {!isLoggedIn && (
                <Dropdown.Item onClick={handleSignupClick}>
                  Sign up
                </Dropdown.Item>
              )}
              {isLoggedIn && (
                <Dropdown.Item onClick={handleProfileClick}>
                  Profile
                </Dropdown.Item>
              )}
              {isLoggedIn && (
                <Dropdown.Item onClick={handleCollectionsClick}>
                  Collections
                </Dropdown.Item>
              )}
              {isLoggedIn && (
                <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
