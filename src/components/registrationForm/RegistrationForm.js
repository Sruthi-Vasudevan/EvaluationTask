import React, { useState } from "react";
import "./RegistrationForm.css";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "registerDbCollection", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      window.alert("Email id already registered");
      setRegistrationSuccess(false);
    } else {
      try {
        await setDoc(doc(db, "registerDbCollection", email), {
          firstName: firstName,
          lastName: lastName,
          phoneNo: phoneNo,
          country: country,
          email: email,
          password: password,
        });

        window.alert("Registration successfull");
        setRegistrationSuccess(true);
      } catch (e) {
        console.error("Error in registration process: ", e);
        setRegistrationSuccess(false);
      }
    }
  };

  const registration = () => {
    return (
      <div className="registration-form">
        <h2>Registration Form</h2>
        <br></br>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <br></br>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <br></br>
          <label>
            Phone Number:
            <input
              type="text"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </label>
          <br></br>
          <label>
            Country of Residence:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <br></br>
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
            Register
          </button>
        </form>
      </div>
    );
  };

  return registrationSuccess ? null : registration();
}
export default RegistrationForm;
