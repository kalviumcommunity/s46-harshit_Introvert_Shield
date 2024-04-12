import axios from "axios";
import { setCookie } from "./Cookies.js";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

const Signup = () => {
    const navigate = useNavigate();
    const {
      register,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const handleSignup = async (data) => {
      if (data.password !== data.confirm) {
        console.error("Passwords do not match");
      } else {
        try {
          // eslint-disable-next-line no-unused-vars
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
          setCookie('username', data.Username, 1)
          setCookie('jwtToken', response.data, 1)

            navigate("/home");

        } catch (err) {
          console.error(err.response.data.message);
        }
      }
    };

  return (
    <div className="introvert-shield-wrapper">
      <h1 className="introvert-shield-top">
        Join Introvert Shield
      </h1>
      <div>
        <form onSubmit={handleSubmit(handleSignup)}>
          <input
            className="introvert-shield-username"
            placeholder="Username"
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
          {errors.Username && <p>{errors.Username.message}</p>}
          <input
            className="introvert-shield-username"
            placeholder="Email"
            type="text"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            className="introvert-shield-password"
            type="password"
            placeholder="Password"
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
          {errors.password && <p>{errors.password.message}</p>}

          <input
            className="introvert-shield-password"
            type="password"
            placeholder="Confirm Password"
            {...register("confirm", {
              required: "Confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords don't match",
            })}
          />
          {errors.confirm && <p>{errors.confirm.message}</p>}

          <button className="introvert-shield-button signup" type="submit">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span className="introvert-shield-button">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

