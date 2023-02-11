import React from "react";
import { NavLink } from "react-router-dom";
function Nav() {
  return (
    <div className="NavBar p-2 bg-gradient-to-r from-gray-500 to-gray-50 border-2 fixed w-full flex flex-col md:flex-row z-40 text-[20px] m-auto">
      <NavLink to="/" className="Nav_Logo m-3 ">
        Door Step
      </NavLink>
      <div className="flex md:ml-auto ml-0 md:mr-auto mr-0 w-5/6 align-middle">
        <div className="flex flex-col md:flex-row flex-wrap md:ml-auto ml-0 align-middle">
          <NavLink to="/Search" className="searchbar m-3">
            <input type="text" placeholder="Search" />
          </NavLink>
          <NavLink to="/Login" className="Login m-3  ">
            Login
          </NavLink>
          <NavLink to="/Cart" className="Cart m-3  ">
            Cart
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Nav;
