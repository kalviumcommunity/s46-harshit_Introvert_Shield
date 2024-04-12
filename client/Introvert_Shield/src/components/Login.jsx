import axios from "axios";
import { setCookie } from "./Cookies";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import './Login.css'


function Login() {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const handleSignup = async (data) => {
      try {
        const response = await axios.post( import.meta.env.VITE_API_URL_USERS+"/login", {
          username: data.Username,
          password: data.password,
        });
        console.log("Login Successful");
  
        setCookie("username", data.Username, 1);
        setCookie('jwtToken', response.data, 1)
  
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } catch (err) {
        console.error(err.response.data.message);
      }
    };
  return (
    <>
    <div className="introvert-shield-wrapper">
      <h1 className="introvert-shield-top">
        Welcome to Introvert Shield
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

          <button className="introvert-shield-button login" type="submit">
            Login
          </button>
        </form>
        <p>
          New here?{" "}
          <Link to="/signup">
            <span className="introvert-shield-button">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default Login
