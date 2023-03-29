import React, { useEffect, useState } from "react";
import "./ProfileView.css";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import UpdateProfile from "../updateProfile/UpdateProfile";

const ProfileView = ({ email }) => {  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");

  const [action, setAction] = useState("profileView");

  useEffect(() => {
    getUser();
  }, [email]);

  const getUser = async () => {
    const docRef = doc(db, "registerDbCollection", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) setFirstName(docSnap.data().firstName);
    setLastName(docSnap.data().lastName);
    setCountry(docSnap.data().country);
    setPhoneNo(docSnap.data().phoneNo);
  };

  const deleteUser = async () => {
    setAction("delete");
    const deleteResult = window.confirm("Are you sure you want to delete the account?");
    if (deleteResult) {
      await deleteDoc(doc(db, "registerDbCollection", email));
    }
  };

  const profileView = () => {
    return (
      <div className="profile-view">
        <h2>Profile View</h2>
        <p>Full Name: {`${firstName} ${lastName}`}</p>
        <p>Email: {email}</p>
        <p>Phone Number: {phoneNo}</p>
        <p>Country of Residence: {country}</p>

        <button className="button-style" onClick={() => setAction("update")}>
          Update
        </button>
        <button className="button-style" onClick={deleteUser}>
          Delete
        </button>
      </div>
    );
  };

  return action === "profileView" ? (
    profileView()
  ) : action === "update" ? (
    <UpdateProfile emailProp={email} />
  ) : null;
};

export default ProfileView;
