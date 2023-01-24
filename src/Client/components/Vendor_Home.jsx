import React from "react";
import { NavLink } from "react-router-dom";
const Vendor_Home = (props) => {
  console.log(props.vendor_data);
  const submit_handeler = () => {};
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
      <form className="Vendorsform">
        <label>Categories</label>
        <select>
          <option>Dairy</option>
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Atta,Rice,Dal</option>
          <option>Snacks</option>
        </select>
        <label>Product Name</label>
        <input type="text"></input>
        <label>Product Image Link</label>
        <input type="text"></input>
        <label>Quantity</label>
        <input type="text"></input>
        <label>Price</label>
        <input type="text"></input>
        <label>Stock</label>
        <input type="text"></input>
        <label>About</label>
        <textarea></textarea>
        <input type="button" value="Upload" onClick={submit_handeler}></input>
      </form>
    </div>
  );
};

export default Vendor_Home;
