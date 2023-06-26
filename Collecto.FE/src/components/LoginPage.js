import React from "react";

const LoginPage = () => {
  return (
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
          <h1 className="text-bold text-center">Log in</h1>
          <form>
            <div className="form-floating mt-5">
              <input
                className="form-control rounded-bottom-0"
                id="floatingInput"
                type="email"
                placeholder="Enter your Email"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating">
              <input
                className="form-control rounded-top-0"
                type="password"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-check my-3">
              <input className="form-check-input" type="checkbox" id="flexCheckChecked" />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
