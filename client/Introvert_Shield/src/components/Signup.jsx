import axios from "axios";
import { setCookie } from "./Cookies.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  // Calculate password strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 5) strength++;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[\W]/.test(pwd)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSignup = async (data) => {
    if (data.password !== data.confirm) {
      setSignupError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setSignupError("");

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL_USERS,
        {
          username: data.Username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirm,
        }
      );
      console.log("Signup Successful");
      setCookie("username", data.Username, 1);
      setCookie("jwtToken", response.data, 1);
      navigate("/home");
    } catch (err) {
      console.error(err.response?.data?.message || "Signup failed");
      setSignupError(err.response?.data?.message || "Signup failed. Please try again.");
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
            </svg>
          </div>
          <h1 className="auth-title">Join the Shield</h1>
          <p className="auth-subtitle">Create your safe space account</p>
        </div>

        {/* Signup Form */}
        <form className="auth-form" onSubmit={handleSubmit(handleSignup)}>
          {/* Global Error Message */}
          {signupError && (
            <div className="auth-error-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{signupError}</span>
            </div>
          )}

          {/* Username Input */}
          <div className="auth-input-group">
            <label className="auth-input-label">Username</label>
            <div className="auth-input-wrapper">
              <input
                className={`auth-input ${errors.Username ? 'error' : ''}`}
                placeholder="Choose a username"
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

          {/* Email Input */}
          <div className="auth-input-group">
            <label className="auth-input-label">Email</label>
            <div className="auth-input-wrapper">
              <input
                className={`auth-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            {errors.email && (
              <div className="auth-error-message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errors.email.message}</span>
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
                placeholder="Create a password"
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
            {/* Password Strength Indicator */}
            {password && (
              <div className="password-strength">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`password-strength-bar ${passwordStrength >= level ? 'active' : ''}`}
                  />
                ))}
              </div>
            )}
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

          {/* Confirm Password Input */}
          <div className="auth-input-group">
            <label className="auth-input-label">Confirm Password</label>
            <div className="auth-input-wrapper">
              <input
                className={`auth-input ${errors.confirm ? 'error' : ''}`}
                type="password"
                placeholder="Confirm your password"
                {...register("confirm", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords don't match",
                })}
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            {errors.confirm && (
              <div className="auth-error-message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errors.confirm.message}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button className="auth-submit-btn signup" type="submit" disabled={isLoading}>
            <span>
              {isLoading ? (
                <>
                  <span className="auth-loading"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </form>

        {/* Switch to Login */}
        <div className="auth-switch">
          <span className="auth-switch-text">
            Already have an account?
            <Link to="/login" className="auth-switch-link">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
