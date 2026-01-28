import axios from "axios";
import { setCookie } from "./Cookies";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    setIsLoading(true);
    setLoginError("");
    
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL_USERS + "/login",
        {
          username: data.Username,
          password: data.password,
        }
      );
      console.log("Login Successful");

      setCookie("username", data.Username, 1);
      setCookie("jwtToken", response.data, 1);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      console.error(err.response?.data?.message || "Login failed");
      setLoginError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo Section */}
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your Introvert Shield account</p>
        </div>

        {/* Login Form */}
        <form className="auth-form" onSubmit={handleSubmit(handleLogin)}>
          {/* Global Error Message */}
          {loginError && (
            <div className="auth-error-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          {/* Username Input */}
          <div className="auth-input-group">
            <label className="auth-input-label">Username</label>
            <div className="auth-input-wrapper">
              <input
                className={`auth-input ${errors.Username ? 'error' : ''}`}
                placeholder="Enter your username"
                type="text"
                {...register("Username", {
                  required: "Username is required!",
                  minLength: {
                    value: 3,
                    message: "Username should be more than 3 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Username should be less than 30 characters",
                  },
                })}
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            {errors.Username && (
              <div className="auth-error-message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errors.Username.message}</span>
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="auth-input-group">
            <label className="auth-input-label">Password</label>
            <div className="auth-input-wrapper">
              <input
                className={`auth-input ${errors.password ? 'error' : ''}`}
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required!",
                  pattern: {
                    value: /.*[\W]+.*/i,
                    message: "Password must contain at least one special character",
                  },
                  minLength: {
                    value: 5,
                    message: "Password must have at least 5 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must have at most 20 characters",
                  },
                })}
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            {errors.password && (
              <div className="auth-error-message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errors.password.message}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button className="auth-submit-btn" type="submit" disabled={isLoading}>
            <span>
              {isLoading ? (
                <>
                  <span className="auth-loading"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </form>

        {/* Switch to Signup */}
        <div className="auth-switch">
          <span className="auth-switch-text">
            Don't have an account?
            <Link to="/signup" className="auth-switch-link">
              Create one
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
