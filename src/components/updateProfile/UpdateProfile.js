import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import ProfileView from "../profileView/ProfileView";

const UpdateProfile = ({ emailProp }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [btn, setBtn] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const docRef = doc(db, "registerDbCollection", emailProp);
    const docSnap = await getDoc(docRef);
    // console.log("db data", docSnap.data());

    if (docSnap.exists()) {
      setFirstName(docSnap.data().firstName);
      setLastName(docSnap.data().lastName);
      setCountry(docSnap.data().country);
      setPhoneNo(docSnap.data().phoneNo);
      setEmail(docSnap.data().email);
      setPassword(docSnap.data().password);
    }
  };

  const handleSubmit = async () => {
    const docRef = await doc(db, "registerDbCollection", emailProp);

    const updatedData = {
      firstName: firstName,
      lastName: lastName,
      phoneNo: phoneNo,
      country: country,
      email: email,
      password: password,
    };

    updateDoc(docRef, updatedData)
      .then((docRef) => {
        // console.log("updated");
        setUpdateSuccess(true);
      })
      .catch((err) => {
        console.log("error occurred",err);
        setUpdateSuccess(false);
      });
  };

  const updateForm = () => {
    return (
      <div className="update-profile">
        <h2>Update Profile</h2>
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
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br></br> <br></br>
        <button className="button-style" onClick={handleSubmit}>
          Save
        </button>
        <button className="button-style" onClick={() => setBtn("cancel")}>
          Cancel
        </button>
      </div>
    );
  };

  return updateSuccess || btn === "cancel" ? (
    <ProfileView email={emailProp} />
  ) : (
    updateForm()
  );
};

export default UpdateProfile;
