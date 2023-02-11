import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart_Item = (props) => {
  const item_qty = props.detail[1];
  const [qty, setQty] = useState(item_qty);
  const [product, setProduct] = useState({});
  const add_product = async () => {
    try {
      const list = { cust_id: props.cust_id, pid: props.detail[0] };
      await axios
        .post("http://localhost:3001/api/insertcart", list)
        .then(() => {
          setQty((prev) => prev + 1);
        });
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
    // setQty(qty + 1);
  };
  const get_product = async (id) => {
    const list = { pid: id };
    const res = await axios.post(
      "http://localhost:3001/api/get_product_info_cart",
      list
    );
    setProduct((prev) => (prev = { ...res.data }));
    console.log(res.data);
  };
  useEffect(() => {
    // console.log(props.detail[0]);
    get_product(props.detail[0]);
  }, []);
  return (
    <div>
      <div className="prod_name">{product.product_name}</div>
      <div classNmae="prod_qty">{qty}</div>
      <div class="add">
        {/* <button onClick={add_product}>+</button> */}
        <input type="button" value="+" onClick={add_product}></input>
      </div>
    </div>
  );
};

export default Cart_Item;
