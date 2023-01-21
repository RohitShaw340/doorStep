import React from "react";
import { NavLink } from "react-router-dom";
function Nav() {
  return (
    <div className="NavBar flex flex-row justify-between">
      <NavLink to="/" className="Nav_Logo">
        Door Step
      </NavLink>
      <NavLink to="/Search" className="searchbar">
        <input type="text" placeholder="Search" />
      </NavLink>
      <NavLink to="/Login" className="Login">
        Login
      </NavLink>
      <NavLink to="/Cart" className="Cart">
        Cart
      </NavLink>
    </div>
  );
}

export default Nav;
