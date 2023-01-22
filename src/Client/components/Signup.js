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
  const [error, setError] = useState("");
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
  //Submit Handler :-
  const signup_handeler = () => {
    const list = {
      type,
      name,
      phone,
      email,
      address,
      password,
    };

    axios.post("http://localhost:3001/api/signup/", list).then((res) => {
      if (res.data == "noerror") {
        setError("");
        setName("");
        setMobile("");
        setEmail("");
        setPass("");
        setAddress("");
        navigate("/Login");
      } else {
        if (res.data.errors) {
          if (res.data.errors.type) setError(res.data.errors.type.message);
          else if (res.data.errors.name) setError(res.data.errors.name.message);
          else if (res.data.errors.phone)
            setError(res.data.errors.phone.message);
          else if (res.data.errors.email)
            setError(res.data.errors.email.message);
          else if (res.data.errors.address)
            setError(res.data.errors.address.message);
          else if (res.data.errors.password)
            setError(res.data.errors.password.message);
        } else {
          if (res.data.keyValue.email) setError("Email Already Taken");
          else if (res.data.keyValue.phone) setError("Phone No. Already Taken");
        }
      }
    });
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
            <br></br>
            <p>{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
