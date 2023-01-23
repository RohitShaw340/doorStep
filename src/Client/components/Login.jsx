import React, { useState } from "react";
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
    <div className="login_container bg-slate-300 w-90% m-4">
      <div className="content justify-center">
        <div className="form m-auto">
          <h1 className="login_head">
            <center>LOGIN</center>
          </h1>
          <form className="login_form">
            <lable className="m-4" >Username / Email</lable>
            <input
              type="text"
              className="input m-4"
              value={username}
              onChange={username_handeler}
            ></input>
            <br />
            <lable className="m-4" >Password</lable>
            <input
              type="password"
              className="input m-4"
              value={password}
              onChange={password_handeler}
            ></input>
            <br></br>
            <input
              type="button"
              value="Login"
              onClick={login_handeler}
              className="Button m-4"
            ></input>
            <p className="error m-4">{err}</p>
            <Link to="/Signup" className="m-4">Create New Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
