import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar-expand  shadow-sm d-flex">
      <div className="container">
        <div className="d-flex justify-content-between align-content-center p-3">
          <span className="align-content-center">
            <a className="navbar-brand" href="/">
              <i className="bi bi-flower1 fs-3  my-1 text-danger"></i>
            </a>
            <a className="navbar-brand " href="/">
              <p className="fs-2 d-inline text-danger  ">collecto </p>
            </a>
          </span>
          <div className="">
            <div className="input-group">
              <input
                className="form-control border-end-0 border rounded-start-pill focus-ring focus-ring-light shadow "
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
          <div className="border border-1 rounded-pill shadow">
            <i class="bi bi-list fs-3 px-2"></i>
            <i className="bi bi-person-circle fs-3 px-2"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
