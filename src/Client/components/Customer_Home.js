import React from "react";
import { NavLink } from "react-router-dom";
import Adds from "./HomeComponents/Adds";
import Categories from "./HomeComponents/Catagories";
const Customer_Home = (props) => {
  console.log(props.customer_data);
  return (
    <div>
      <nav className="Search_Nav">
        <NavLink to="/Customer_Home" className="Nav_Logo">
          Door Step
        </NavLink>
        <NavLink to="/Search" className="searchbar">
          <input type="text" placeholder="Search" />
        </NavLink>
        <div className="info">{props.customer_data.name}</div>
        <NavLink to="/">LogOut</NavLink>
      </nav>
      <br></br>
      <div className="card">
        <Adds />
        <Categories />
      </div>
    </div>
  );
};

export default Customer_Home;
