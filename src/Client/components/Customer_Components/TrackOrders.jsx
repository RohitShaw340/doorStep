import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import orders from "../../../Server/Models/Orders_collec";
import Track_items from "./Track_items";

const TrackOrders = (props) => {
  // const utcTime = "2023-03-08T11:14:09.598+00:00"; // UTC timestamp
  // const date = new Date(utcTime); // convert UTC timestamp to Date object
  // const istOffset = 5.5 * 60 * 60 * 1000; // offset for IST timezone in milliseconds
  // const istTime = new Date(date.getTime() + istOffset); // add offset to UTC time

  // // Extract date and time separately for IST timezone
  // const istDate = istTime.toLocaleDateString('en-IN');
  // const istTimeStr = istTime.toLocaleTimeString('en-IN');

  // console.log("UTC Time: " + utcTime);
  // console.log("IST Date: " + istDate);
  // console.log("IST Time: " + istTimeStr);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const get_products = async () => {
    const res = await axios.post("http://localhost:3001/track/order", {
      id: props.cid.email,
    });
    console.log(res.data);
    setOrder((prev) => {
      prev = [...res.data];
      return prev;
    });
  };

  useEffect(() => {
    // console.log(props.customer_data);
    if (props.cid.email) {
      if (props.cid.email == "no_id") {
        alert(" Please Login With your account to Place Orders");
        navigate("/Login");
      }
    } else {
      alert(" Please Login With your account to Place Orders");
      navigate("/Login");
    }
    get_products();
  }, []);
  return (
    <div>
      <NavLink to="/Customer_home">Home</NavLink>
      {order.map((items) => (
        <Track_items items={items} />
      ))}
    </div>
  );
};

export default TrackOrders;
