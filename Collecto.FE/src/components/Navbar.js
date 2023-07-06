import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import userService from "../services/userService";
import UserAvatar from "./UserAvatar";
import { Dropdown } from "bootstrap/dist/js/bootstrap.bundle";

const Navbar = () => {
  console.log("navbar");
  const dropdownRef = useRef();
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const signOut = () => {
    localStorage.removeItem("jwtToken");
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    if (isLoggedIn) {
      const requestId = Date.now();
      userService
        .getUserData()
        .then((data) => {
          setUserData(data);
          console.log(`[${requestId}] User data:`, data);
        })
        .catch((error) => {
          console.error(`[${requestId}] Error fetching user data:`, error);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const dropdown = new Dropdown(dropdownRef.current);

    return () => {
      dropdown.dispose();
    };
  }, []);

  return (
    <nav className="navbar-expand  shadow-sm d-flex">
      <div className="container-fluid px-lg-5">
        <div className="d-flex justify-content-between align-content-center p-3">
          <span className="align-content-center d-none d-sm-inline-block me-lg-5 pe-lg-5">
            <a className="navbar-brand" href="/">
              <i className="bi bi-flower1 fs-3  my-1 text-danger"></i>
            </a>
            <span className="d-none d-xl-inline-block">
              <a className="navbar-brand  " href="/">
                <p className="fs-2 d-inline text-danger  ">collecto </p>
              </a>
            </span>
          </span>
          <div className="col-12 col-sm-6 col-lg-3 ">
            <div className="input-group ">
              <input
                className="form-control border-end-0 border rounded-start-pill  focus-ring-info shadow"
                type="text"
                placeholder="search..."
              />
              <span className="input-group-append ">
                <button className="btn btn-outline-secondary bg-white border rounded-end-pill shadow">
                  <i className="bi bi-search fs-5 text-danger"></i>
                </button>
              </span>
            </div>
          </div>
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="btn border border-1 rounded-pill  d-none d-sm-inline-block p-0 focus-ring focus-ring-light shadow-sm align-content-center"
              data-bs-toggle="dropdown"
            >
              {!isLoggedIn && (
                <>
                  <i className="bi bi-list fs-4 px-2 py-0"></i>
                  <i className="bi bi-person-circle fs-3 px-2"></i>{" "}
                </>
              )}

              {isLoggedIn && (
                <>
                  <i className="bi bi-list fs-5 px-2 py-auto"></i>
                  <UserAvatar userData={userData} />
                </>
              )}
            </button>

            <ul className="dropdown-menu">
              {!isLoggedIn && (
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </button>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </button>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <button
                    className="btn btn-danger dropdown-item btn btn-danger"
                    onClick={() => navigate("/")}
                  >
                    Profile
                  </button>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <button
                    className="btn btn-danger dropdown-item btn btn-danger"
                    onClick={() => navigate("/")}
                  >
                    Collections
                  </button>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <button
                    className="btn btn-danger dropdown-item btn btn-danger"
                    onClick={signOut}
                  >
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
