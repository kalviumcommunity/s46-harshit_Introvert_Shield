// import React from 'react'
import { Link } from "react-router-dom";

function IntrovertShield() {

  return (
    <div>
       <>
      <div className="wrapper">
        <h2>Welcome to Intovert Shield</h2>
        <div>
          <h1 className="top">
          A Place made for and made by Intovert People.
          </h1>
        </div>

        <div className="buttons">
          <button className="btnone button singup">
            <Link to="/signup">Sign Up</Link>
          </button>
          <button className="btnone button log">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
      <p className="copyright">
        All rights reserved. This project was created by Harshit.
      </p>
    </>
    </div>
  )
}

export default IntrovertShield
