import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar-expand  shadow-sm d-flex">
      <div className="container container-fluid">
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
          <div className="col-12 col-sm-8 col-lg-4">
            <div className="input-group">
              <input
                className="form-control border-end-0 border rounded-start-pill focus-ring focus-ring-light shadow"
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
          
            <button className="btn border border-1 rounded-pill shadow d-none d-sm-inline-block p-0 hover" data-bs-toggle="dropdown">
              <i className="bi bi-list fs-3 px-2"></i>
              <i className="bi bi-person-circle fs-3 px-2"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" href="/">
                  Log in
                </button>
              </li>
              <li>
                <button className="dropdown-item" href="/</li>">
                  Sign up
                </button>
              </li>
              <li>
                <button className="dropdown-item" href="/">
                  Something else here
                </button>
              </li>
            </ul>
          </div>
       
      </div>
    </nav>
  );
};

export default Navbar;
