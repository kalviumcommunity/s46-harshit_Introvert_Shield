import { Link } from "react-router-dom";
import "./Introvert.css"

function IntrovertShield() {

  return (
       <>
      <div className="introvert-wrapper">
        <h2 className='introvert-heading'>Welcome to Intovert Shield</h2>
        <div>
          <h1 className="introvert-subheading">
          A Place made for and made by Intovert People.
          </h1>
        </div>

        <div className="buttons">
          <button className="introvert-btnone button singup">
            <Link to="/signup">Sign Up</Link>
          </button>
          <button className="introvert-btnone button log">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
      <p className="copyright">
        All rights reserved. This project was created by Harshit.
      </p>
    </>
  )
}

export default IntrovertShield
