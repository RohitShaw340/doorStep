import React, { useState } from "react";

const Cart = (props) => {
  const [pid, setPid] = useState({});
  const [total, setTotal] = useState(0);
  if (props.data._id) {
    const obj = { ...pid };
    if (obj[props.data._id]) {
      obj[props.data._id]++;
    } else {
      obj[props.data._id] = 1;
    }
    setPid(obj);
    console.log(pid);
  }

  return <div>{props.data.product_name}</div>;
};

export default Cart;
