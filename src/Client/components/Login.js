import React, { useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const username_handeler = (event) => {
    setUsername(event.target.value);
  };
  const password_handeler = (event) => {
    setPass(event.target.value);
  };

  const [err, setErr] = useState("");

  const checkAPI = () => {
    const list = { username, password };
    axios.post("http://localhost:3001/api/login", list).then((res) => {
      const user = res.data;
      if (user.found) {
        if (user.pass) {
          console.log(user);
          setErr("");
          props.get_data(user);
          if (user.type == "vendor") navigate("/Vendor_Home");
          else navigate("/Customer_Home");
        } else {
          setErr(" * Password is incorrect");
        }
      } else {
        setErr(" * Account not fount");
        // navigate("/Signup");
      }
    });
  };

  const login_handeler = () => {
    setUsername("");
    setPass("");
    checkAPI();
  };

  return (
    <div className="login_container">
      <Nav />
      <div className="content">
        <div className="form">
          <h1 className="login_head">
            <center>LOGIN</center>
          </h1>
          <form className="login_form">
            <lable>Username / Email</lable>
            <input
              type="text"
              className="input"
              value={username}
              onChange={username_handeler}
            ></input>
            <lable>Password</lable>
            <input
              type="password"
              className="input"
              value={password}
              onChange={password_handeler}
            ></input>
            <br></br>
            <input
              type="button"
              value="Login"
              onClick={login_handeler}
              className="Button"
            ></input>
            <p className="error">{err}</p>
            <Link to="/Signup">Create New Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
