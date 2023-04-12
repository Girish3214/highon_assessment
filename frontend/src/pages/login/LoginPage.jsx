import React from "react";
import "./login-page.css";

import Apple from "../../assets/icons/apple.png";
import Facebook from "../../assets/icons/facebook.png";
import Google from "../../assets/icons/google.png";

const LoginPage = () => {
  return (
    <div className="login-main-container">
      <div className="login-signup-container">
        <div className="icon-button-container">
          <button>
            {" "}
            <img src={Google} alt="icon" /> Signup with Google
          </button>
        </div>
        <div className="icon-button-container">
          <button>
            <img src={Apple} alt="icon" /> Signup with Apple
          </button>
        </div>
        <div className="icon-button-container">
          <button>
            <img src={Facebook} alt="icon" /> Signup with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
