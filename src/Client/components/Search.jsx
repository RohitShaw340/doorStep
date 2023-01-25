import React from "react";
import { NavLink } from "react-router-dom";

const Search = () => {
  return (
    <div>
      <nav className="Search_Nav p-2 bg-gray-50 border-2 fixed w-full flex flex-col md:flex-row z-40">
        <NavLink to="/" className="Nav_Logo">
          Door Step
        </NavLink>
        <input
          classNmae="srarchbar"
          placeholder="Search for items"
          autoFocus="autofocus"
        ></input>
        <NavLink to="/Cart" className="Cart">
          Cart
        </NavLink>
      </nav>
      Search
    </div>
  );
};

export default Search;
