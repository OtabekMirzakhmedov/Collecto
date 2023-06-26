import React from "react";
import "./components.css";

const SignupPage = () => {
  return (
    <div>
      <div className="container">
        <div className="align-content-center pt-3">
          <a href="/">
            <i className="bi bi-flower1 fs-1 my-1 text-danger"></i>
          </a>
          <a className="navbar-brand" href="/">
            <p className="fs-2 d-inline text-danger mx-2">collecto </p>
          </a>
        </div>

        <div className="d-flex justify-content-around mt-5">
          <div className="m-auto col-lg-4 col-md-6 col-sm-8 col-11 ">
            <h1 className="text-bold text-center">Sign Up</h1>
            <form>
              <div className="form-floating mt-5">
                <input
                  className="form-control focus-ring focus-ring-light rounded-0"
                  id="floatingInputName"
                  type="text"
                  placeholder="Enter your Email"
                />
                <label htmlFor="floatingInputName">Fullname</label>
              </div>
              <div className="form-floating my-4">
                <input
                  className="form-control focus-ring focus-ring-light rounded-0 "
                  id="floatingInput"
                  type="email"
                  placeholder="Enter your Email"
                />
                <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="form-floating my-4">
                <input
                  className="form-control focus-ring focus-ring-light rounded-0 "
                  type="password"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  className="form-control focus-ring focus-ring-light rounded-0 "
                  type="password"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
   

              <button type="submit" className="btn btn-success rounded-0 w-100">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
