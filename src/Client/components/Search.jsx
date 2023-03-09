import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Items from "./HomeComponents/Items";

const Search = (props) => {
  const [search_str, setSearch_str] = useState("");
  const [result, setResult] = useState([]);
  const [email, set_email] = useState("no_id");
  useEffect(() => {
    if (props.cid.email) {
      console.log("email set", props.cid.email);
      set_email((prev) => props.cid.email);
    }
  }, []);

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

    setResult((n) => n.splice(0, n.length));

    console.log(words);
    console.log(result);
    res(words);

    setSearch_str("");
  };

  return (
    <div>
      <nav className="Search_Nav p-2 bg-gray-50 border-2 fixed w-full flex flex-col md:flex-row z-40">
        {props.cid.email != "no_id" ? (
          <NavLink to="/Customer_home" className="Nav_Logo">
            Door Step
          </NavLink>
        ) : (
          <NavLink to="/" className="Nav_Logo">
            Door Step
          </NavLink>
        )}
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
          <Items cid={email} item={details}></Items>
        ))}
      </div>
    </div>
  );
};

export default Search;
