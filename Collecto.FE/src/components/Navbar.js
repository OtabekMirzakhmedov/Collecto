import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { Dropdown, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../slices/languageSlice";
import { setSearchQuery } from "../slices/searchSlice";
import { toggleTheme } from "../slices/themeSlice";
import { clearTag } from "../slices/tagSlice";
import "./components.css";
import translations from "../translations";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const fullName = sessionStorage.getItem("fullName");
  const isLoggedIn = !!userId;
  const language = useSelector((state) => state.language.language);
  const isAdmin = sessionStorage.getItem("role") === "Admin";
  const [searchInput, setSearchInput] = useState("");
  const theme = useSelector((state) => state.theme);

  const signOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const translation = translations[language]["Navbar"];

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButtonClick = () => {
    dispatch(setSearchQuery(searchInput));
    dispatch(clearTag());
    navigate("/");
  };

  const handleLoginClick = () => {
    console.log("Navbar handle login click");
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

  const handleAdminClick = () => {
    navigate("/admin-dashboard");
  };

  const handleLanguageChange = (selectedLanguage) => {
    dispatch(setLanguage(selectedLanguage));
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
          <div className="col-10 col-sm-8 col-lg-6 col-md-6 col-xl-3">
            <div className="input-group">
              <input
                className="form-control border-end-0 border rounded-start-pill focus-ring-info shadow"
                type="text"
                placeholder={translation.SearchPlaceholder}
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <span className="input-group-append">
                <button
                  className="btn btn-outline-secondary bg-white border rounded-end-pill shadow"
                  onClick={handleSearchButtonClick}
                >
                  <i className="bi bi-search fs-5 text-danger"></i>
                </button>
              </span>
            </div>
          </div>
          <Stack direction="horizontal">
            <Dropdown onClick={() => dispatch(toggleTheme())} className="d-none d-sm-inline-block" >
              <Dropdown.Toggle variant="">
                {theme === "light" ? (
                  <i className="bi bi-moon-stars"></i>
                ) : (
                  <i className="bi bi-sun"></i>
                )}
              </Dropdown.Toggle>
            </Dropdown>

            <Dropdown className="d-none d-sm-inline-block">
              <Dropdown.Toggle variant="">
                <i className="bi bi-globe fs-6"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleLanguageChange("en")}>
                  English
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleLanguageChange("ru")}>
                  Russian
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle
                className="btn border border-1 rounded-pill  d-sm-inline-block p-0 focus-ring focus-ring-light shadow-sm align-content-center custom-toggle"
                variant=""
              >
                {!isLoggedIn ? (
                  <>
                    <i className="bi bi-list fs-4 px-1 py-0"></i>
                    <i className="bi bi-person-circle fs-3 px-2"></i>
                  </>
                ) : (
                  <>
                    <i className="bi bi-list fs-4 px-2 py-0"></i>
                    <i className="bi bi-person-check fs-3 px-2 text-success"></i>
                  </>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {!isLoggedIn && (
                  <Dropdown.Item onClick={handleLoginClick}>
                    {translation.LogIn}
                  </Dropdown.Item>
                )}
                {!isLoggedIn && (
                  <Dropdown.Item onClick={handleSignupClick}>
                    {translation.SignUp}
                  </Dropdown.Item>
                )}
                {isLoggedIn && (
                  <Dropdown.Item onClick={handleProfileClick}>
                    {fullName}
                  </Dropdown.Item>
                )}
                <Dropdown.Divider />
                {isAdmin && (
                  <Dropdown.Item onClick={handleAdminClick}>
                    {translation.Admin}
                  </Dropdown.Item>
                )}
                {isLoggedIn && (
                  <Dropdown.Item onClick={handleCollectionsClick}>
                    {translation.Collections}
                  </Dropdown.Item>
                )}
                {isLoggedIn && (
                  <Dropdown.Item onClick={signOut}>
                    {translation.SignOut}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
