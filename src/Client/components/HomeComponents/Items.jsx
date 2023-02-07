import React from "react";

const Items = (props) => {
  const cart_handler = () => {
    props.cart_item(props.item);
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
