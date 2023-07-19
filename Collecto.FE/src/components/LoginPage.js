import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../slices/authSlice";
import authService from "../services/authService";
import translations from "../translations";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector((state) => state.language.language);
  const translation = translations[language]["LoginSignupPage"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response  = await authService.login(data);
      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("fullName", response.data.fullName);
      sessionStorage.setItem("role", response.data.userRole);
      dispatch(loginSuccess({ token: response.data.jwtToken }));
      navigate("/");
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
          <h1 className="text-bold text-center mb-5">{translation.LogInHeader}</h1>
        
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
                placeholder={translation.Email}
                {...register("email", {
                  required: translation.EmailRequired,
                  pattern: {
                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                    message: translation.EmailInvalid,
                  },
                })}
              />
              <label htmlFor="floatingInput">{translation.Email}</label>
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
                placeholder = {translation.Password}
                {...register("password", {
                  required: translation.PasswordRequired,
                  minLength: {
                    value: 6,
                    message: translation.PasswordRequirement,
                  },
                })}
              />
              <label htmlFor="floatingPassword">{translation.Password}</label>
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
            
            <button
              type="submit"
              className="btn btn-primary w-100 mb-2 mt-2"
              disabled={isLoading} 
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {translation.LoginButtonSpinner}
                </>
              ) : (
                translation.LogInButton
              )}
            </button>

            <div className="center">
              <span className="m-0 p-0">{translation.NoAccount}</span>
              <button className="btn btn-link m-0" onClick={() => navigate('/signup')} >{translation.SignUpLink}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
