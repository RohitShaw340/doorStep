import React from "react";
import Adds from "./HomeComponents/Adds";
import Nav from "./Nav";
import Category_container from "./HomeComponents/Category_container";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const cart_handler = (data) => {
    if (data.product_name) {
      alert("First LogIn / Sgnup for placing order");
      navigate("/Login");
    }
  };
  return (
    <div className="Home">
      <Nav> </Nav>
      <br></br>
      <div className="card pt-16">
        <Adds />
        <Category_container item={cart_handler} />
      </div>
    </div>
  );
};

export default Home;
