import React, { useState } from "react";
import "./LoginForm.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import ProfileView from "../profileView/ProfileView";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitted values:", email, password);
    
    const docRef = doc(db, "registerDbCollection", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().password === password) {
      // console.log("pswd from db", docSnap.data().password);
      setLoginSuccess(true);
    } else {
      setErrorMessage("Invalid Username or Password");
      setLoginSuccess(false);
    }
  };

  const loginForm = () => {
    return (
      <div className="login-form">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br></br>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br></br>
          <br></br>
          <button className="button-style" type="submit">
            Login
          </button>
          {errorMessage && <div>{errorMessage}</div>}
        </form>
      </div>
    );
  };

  return loginSuccess ? <ProfileView email={email} /> : loginForm();
}
export default LoginForm;
