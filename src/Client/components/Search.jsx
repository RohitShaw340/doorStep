import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Items from "./HomeComponents/Items";

const Search = () => {
  const [search_str, setSearch_str] = useState("");
  const [result, setResult] = useState([]);
  const [items, setItems] = useState([]);
  const setSearch = (event) => {
    setSearch_str(event.target.value);
  };
  const res = async (words) => {
    words.map((str) => {
      axios
        .post("http://localhost:3001/api/searchproducts", { str })
        .then((res) => {
          setResult(result.concat(res.data));
        });
    });
  };
  const search_handler = () => {
    const words = search_str.toLowerCase().split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    const arr = [];
    setResult([]);

    console.log(words);
    console.log(result);
    res(words);
    // res(words);

    setSearch_str("");
  };
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
          onChange={setSearch}
          value={search_str}
        ></input>
        <input value="search" type="button" onClick={search_handler}></input>
        <NavLink to="/Cart" className="Cart">
          Cart
        </NavLink>
      </nav>
      <div className="search pt-16">
        {result.map((details) => (
          <Items item={details}></Items>
        ))}
      </div>
    </div>
  );
};

export default Search;
