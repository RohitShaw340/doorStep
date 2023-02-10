import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Items = (props) => {
  const navigate = useNavigate();

  const cart_handler = async () => {
    // props.cart_item(props.item._id);
    if (props.cid == "no_id") {
      const confirmed = window.confirm("First LogIn / Sgnup for placing order");
      if (confirmed) navigate("/Login");
    } else {
      try {
        const list = { cust_id: props.cid, pid: props.item._id };
        const res = await axios.post(
          "http://localhost:3001/api/insertcart",
          list
        );
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className=" border-2 hover:border-cyan-500 rounded-lg flex flex-col flex-none w-[215px] m-2 p-2">
      <img
        src={props.item.image}
        alt=""
        className="m-auto w-[154px] h-[154px]"
      />
      <div className="item_quantity m-auto">
        <h1 className="m-auto">{props.item.product_name}</h1>
      </div>
      <div className="item_quantity ">
        <p>{props.item.quantity}</p>
      </div>
      <div className="item_price ">
        <p>{props.item.price}$</p>
      </div>
      <button className="bg-gray-100 rounded-full w-1/2" onClick={cart_handler}>
        add
      </button>
    </div>
  );
};

export default Items;
