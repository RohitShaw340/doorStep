import React from "react";
import { NavLink } from "react-router-dom";
const Vendor_Home = (props) => {
  console.log(props.vendor_data);
  return (
    <div>
      <nav className="Search_Nav">
        <NavLink to="/Vendor_Home" className="Nav_Logo">
          Door Step
        </NavLink>
        <div className="info">{props.vendor_data.name}</div>
        <NavLink to="/">LogOut</NavLink>
      </nav>
      <br></br>
      Vendor_Home
    </div>
  );
};

export default Vendor_Home;
