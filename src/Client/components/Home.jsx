import React from "react";
import Adds from "./HomeComponents/Adds";
import Categories from "./HomeComponents/Catagories";

const Home = () => {
  return (
    <div className="Home">
      <br></br>
      <div className="card">
        <Adds />
        <Categories />
      </div>
    </div>
  );
};

export default Home;
