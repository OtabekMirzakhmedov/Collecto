import React, { useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import {  ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './components.css'

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...signupData } = data;
      const response = await authService.signup(signupData);
      console.log(response);
      toast.success(`Registration successful!You may now login`);
      reset();
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        if (
          error.response.data.includes(`Email '${data.email}' is already taken`)
        ) {
          toast.error(`Email ${data.email} is already taken`);
        } else {
          toast.error(error.response.data);
        }
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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

        <ToastContainer position="top-center" 
         />

        <div className="d-flex justify-content-around mt-5">
          <div className="m-auto col-lg-4 col-md-6 col-sm-8 col-11 mb-5">
            <h1 className="text-bold text-center">Sign Up</h1>
           
            {isLoading && (
              <div className="card border-0 position-absolute start-50 top-50 z-2">
                <div className="spinner-border " role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-floating">
                <input
                  className={`form-control focus-ring focus-ring-light rounded-0 ${
                    errors.fullName ? "is-invalid" : ""
                  }`}
                  id="fullName"
                  type="text"
                  placeholder="Enter your Full Name"
                  {...register("fullName", {
                    required: "Full Name is required",
                  })}
                />
                <label htmlFor="fullName">Full Name</label>
                {errors.fullName && (
                  <div className="invalid-feedback">
                    {errors.fullName.message}
                  </div>
                )}
              </div>

              <div className="form-floating my-4">
                <input
                  className={`form-control focus-ring focus-ring-light rounded-0 ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  id="email"
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
                <label htmlFor="email">Email</label>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="form-floating my-4">
                <input
                  className={`form-control focus-ring focus-ring-light rounded-0 ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password should be at least 6 characters long",
                    },
                  })}
                />
                <label htmlFor="password">Password</label>
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  className={`form-control focus-ring focus-ring-light rounded-0 ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-success rounded-0 w-100 mb-3">
                Sign up
              </button>

              <div >
              <span className="mx-2 p-0">Already have an account?</span>
              <a  href="/login">Log In</a>
            </div>

            </form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default SignupPage;
