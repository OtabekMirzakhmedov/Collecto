import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../slices/authSlice";
import authService from "../services/authService";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log('I am here on submit')
    try {
      const jwtToken  = await authService.login(data);
      dispatch(loginSuccess({ token: jwtToken }));
      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      if (error.response && error.response.data) {
        const loginError = error.response.data;
        setErrorMessage(loginError);
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };


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
          <h1 className="text-bold text-center mb-5">Log in</h1>
        
          <form onSubmit={handleSubmit(onSubmit)}>
          {errorMessage && (
            <div className="text-bg-danger">{errorMessage}</div>
          )}
            <div className="form-floating">
              
              <input
                className={`form-control rounded-0 focus-ring focus-ring-light  ${
                  errors.email ? "is-invalid" : ""
                }`}
                id="floatingInput"
                type="email"
                placeholder="Enter your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <label htmlFor="floatingInput">Email</label>
              {errors.email && (
                <div className="invalid-feedback p-0">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="form-floating">
              <input
                className={`form-control rounded-0 focus-ring focus-ring-light mt-3 ${
                  errors.password ? "is-invalid" : ""
                }`}
                type="password"
                id="floatingPassword"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password should be at least 6 characters long",
                  },
                })}
              />
              <label htmlFor="floatingPassword">Password</label>
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="form-check my-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckChecked"
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mb-2"
              disabled={isLoading} // Disable the button when isLoading is true
            >
              {isLoading ? ( // Render the spinner when isLoading is true
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Signing in...
                </>
              ) : (
                "Sign In" 
              )}
            </button>

            <div className="center">
              <span className="mx-2 p-0">No account yet?</span>
              <a href="/signup" onClick={() => navigate('/signup')} >Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
