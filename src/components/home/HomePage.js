import React, { useState } from "react";
import "./HomePage.css";
import LoginForm from "../loginForm/LoginForm";
import RegistrationForm from "../registrationForm/RegistrationForm";

export const HomePage = () => {
  const [btn, setBtn] = useState("");

  return (
    <div>
      <nav>
        <button className="button-style" onClick={() => setBtn("login")}>
          Login
        </button>
        <button className="button-style" onClick={() => setBtn("register")}>
          Sign Up
        </button>
      </nav>

      {btn === "register" ? (
        <RegistrationForm />
      ) : btn === "login" ? (
        <LoginForm />
      ) : null}
    </div>
  );
};
