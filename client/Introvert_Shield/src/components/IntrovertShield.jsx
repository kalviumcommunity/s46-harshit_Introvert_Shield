import { Link } from "react-router-dom";
import "./Introvert.css";

function IntrovertShield() {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">
          Welcome to <span className="highlight">Introvert Shield</span>
        </h1>
        <p className="landing-tagline">Safe spaces for quiet minds</p>
        <p className="landing-subtitle">
          A community built for and by introverts.
        </p>

        <div className="landing-buttons">
          <Link to="/signup" className="landing-btn primary">Sign Up</Link>
          <Link to="/login" className="landing-btn secondary">Login</Link>
        </div>
      </div>

      <p className="landing-copyright">
        © All rights reserved. This project was created by Harshit.
      </p>
    </div>
  );
}

export default IntrovertShield;
