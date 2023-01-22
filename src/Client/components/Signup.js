import React, { useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  //states:-
  const [type, SetType] = useState("");
  const [name, setName] = useState("");
  const [phone, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPass] = useState("");
  //handelers:-
  const type_handeler = (event) => {
    SetType(event.target.value);
  };
  const name_handeler = (event) => {
    setName(event.target.value);
  };
  const phone_handeler = (event) => {
    setMobile(event.target.value);
  };
  const email_handeler = (event) => {
    setEmail(event.target.value);
  };
  const address_handeler = (event) => {
    setAddress(event.target.value);
  };
  const password_handeler = (event) => {
    setPass(event.target.value);
  };
  const signup_handeler = () => {
    const list = {
      type,
      name,
      phone,
      email,
      address,
      password,
    };
    setName("");
    setMobile("");
    setEmail("");
    setPass("");
    setAddress("");
    console.log(list);
    axios.post("http://localhost:3001/api/signup/", list);
    navigate("/Login");
  };
  return (
    <div className="signup_container">
      <Nav />
      <div className="content">
        <div className="form">
          <h1 className="login_head">
            <center>Sign Up</center>
          </h1>
          <form className="signup_form">
            <lable>Vendor : </lable>
            <input
              type="radio"
              value="vendor"
              className="type"
              name="type"
              onChange={type_handeler}
            ></input>
            <lable>Customer : </lable>
            <input
              type="radio"
              value="customer"
              className="type"
              name="type"
              onChange={type_handeler}
            ></input>
            <br></br>
            <lable>Name</lable>
            <input
              type="text"
              value={name}
              className="input"
              onChange={name_handeler}
            ></input>
            <lable>Mobile No</lable>
            <input
              type="number"
              value={phone}
              className="input"
              onChange={phone_handeler}
            ></input>
            <lable>Email</lable>
            <input
              type="email"
              value={email}
              className="input"
              onChange={email_handeler}
            ></input>
            <lable>Address</lable>
            <input
              type="text"
              value={address}
              className="input"
              onChange={address_handeler}
            ></input>
            <lable>Password</lable>
            <input
              type="password"
              value={password}
              className="input"
              onChange={password_handeler}
            ></input>
            <br></br>
            <input
              type="button"
              value="Sign Up"
              onClick={signup_handeler}
              className="Button"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
