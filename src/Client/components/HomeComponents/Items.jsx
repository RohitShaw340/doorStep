import React from "react";

const Items = ({items,itemId}) => {
  return (
    <div className=" border-2 hover:border-cyan-500 rounded-lg flex flex-col flex-none w-[215px] m-2 p-2">
      <img src={items.img} alt="" 
          className="m-auto w-[154px] h-[154px]" />
      <div className="item_quantity m-auto"><h1 className="m-auto">{items.name}</h1></div>
      <div className="item_quantity "><p>{items.qty}</p></div>
      <div className="item_price "><p>{items.price}</p></div>
      <button className="bg-gray-100 rounded-full w-1/2">add</button>
    </div>
  );
};

export default Items;
