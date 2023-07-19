import React, { useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import {  ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import translations from "../translations";

import "react-toastify/dist/ReactToastify.css";
import './components.css'


const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const language = useSelector((state) => state.language.language);
  const translation = translations[language]["LoginSignupPage"];

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
      toast.success(`${translation.RegistrationSuccess}`);
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
            <h1 className="text-bold text-center mb-5">{translation.SignUpHeader}</h1>
           
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
                  placeholder={translation.FullName}
                  {...register("fullName", {
                    required: translation.FullNameRequired,
                  })}
                />
                <label htmlFor="fullName">{translation.FullName}</label>
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
                  placeholder= {translation.Email}
                  {...register("email", {
                    required: translation.EmailRequired,
                    pattern: {
                      value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      message: translation.EmailInvalid,
                    },
                  })}
                />
                <label htmlFor="email">{translation.Email}</label>
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
                  placeholder={translation.Password}
                  {...register("password", {
                    required: translation.PasswordRequired,
                    minLength: {
                      value: 6,
                      message: translation.PasswordRequirement,
                    },
                  })}
                />
                <label htmlFor="password">{translation.Password}</label>
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
                  placeholder={translation.ConfirmPassword}
                  {...register("confirmPassword", {
                    required: translation.ConfirmPasswordRequired,
                    validate: (value) =>
                      value === getValues("password") ||
                      translation.PasswordNoMatch,
                  })}
                />
                <label htmlFor="confirmPassword">{translation.ConfirmPassword}</label>
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-success rounded-0 w-100 mb-3">
                {translation.SignUpButton}
              </button>

              <div className="align-content-baseline" >
              <span className="m-0 p-0">{translation.YesAccount}</span>
              <button className="btn btn-link m-0 p-1" onClick={() => navigate('/login')}>{translation.LogInButton}</button>
            </div>

            </form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default SignupPage;
