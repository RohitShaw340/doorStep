import React from "react";
import Adds from "./HomeComponents/Adds";
import Categories from "./HomeComponents/Catagories";
import Nav from "./Nav";
const Home = () => {
  return (
    <div className="Home">
      <Nav></Nav>
      <br></br>
      <div className="card">
        <Adds />
        <Categories />
      </div>
    </div>
  );
};

export default Home;
