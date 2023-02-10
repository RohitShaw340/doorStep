import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart_Item from "./Cart_Item";
const Cart = (props) => {
  const navigate = useNavigate();

  const [cart_data, set_cart] = useState({});
  const [items, setItems] = useState([]);
  const display_cart = async (id) => {
    const response = await axios.post("http://localhost:3001/api/displaycart", {
      id,
    });
    console.log(response.data);
    const items_list = Object.entries(response.data);
    // items_list.map((data) => {
    //   setItems(
    //     (prev) => (prev = [...items, { id: data, qty: response.data[data] }])
    //   );
    // });
    setItems((prev) => (prev = [...items_list]));
    console.log(items_list);

    // set_cart(prev => prev={...response.data})
  };

  useEffect(() => {
    if (!props.cid.email) {
      alert("first Login to place ordes");
      navigate("/login");
    } else {
      display_cart(props.cid.email);
    }
  }, []);

  return (
    <div>
      cart
      {items.map((data) => (
        // console.log(data);
        <Cart_Item detail={data}></Cart_Item>
      ))}
    </div>
  );
};

export default Cart;
