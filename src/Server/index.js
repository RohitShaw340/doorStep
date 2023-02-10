const express = require("express");
require("./db/login_db");
const Login_collec = require("./Models/Login_collection");
const Product_collec = require("./Models/Product_collection");
const Cart_collec = require("./Models/Cart_collection");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");
const { useState } = require("react");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.post("/api/login", (req, res) => {
  const read = async () => {
    try {
      const user = req.body;
      const result = await Login_collec.find({ email: user.username });
      if (result.length == 0) {
        res.send({ found: false, pass: false });
      } else if (result[0].password == user.password) {
        res.send({
          found: true,
          pass: true,
          type: result[0].type,
          name: result[0].name,
          email: result[0].email,
          phone: result[0].phone,
          address: result[0].address,
        });
      } else {
        res.send({ found: true, pass: false });
      }
    } catch (err) {
      console.log(err);
    }
  };
  read();
});
app.post("/api/signup", (req, res) => {
  // console.log(req.body);
  const insert = async () => {
    try {
      const rec1 = new Login_collec({
        type: req.body.type,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
      });
      const record = await rec1.save();
      console.log(record);
      res.send("noerror");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  };
  insert();
});
app.post("/api/product", (req, res) => {
  const insert = async () => {
    try {
      const rec = new Product_collec({
        seller_id: req.body.sid,
        categories: req.body.cat,
        product_name: req.body.cap_p_name,
        stock: req.body.stock,
        price: req.body.price,
        quantity: req.body.qty,
        image: req.body.p_image,
        about: req.body.about,
        discount: req.body.discount,
      });
      const record = await rec.save();
      console.log(record);
      res.send("noerror");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  };
  insert();
});
app.get("/api/getproducts", (req, res) => {
  const read = async () => {
    try {
      const result = await Product_collec.find();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };
  read();
});
app.post("/api/searchproducts", (req, res) => {
  const req_str = req.body;
  console.log(req_str);
  const read = async () => {
    try {
      const result = await Product_collec.find({
        product_name: { $regex: req_str.str },
      });
      console.log(result);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  };
  read();
});

app.post("/api/insertcart", (req, res) => {
  const new_cart_insert = async (data) => {
    try {
      const obj = {};
      obj[data.pid] = 1;
      const rec = new Cart_collec({
        cust_id: data.cust_id,
        cart_detail: { ...obj },
      });
      const record = await rec.save();
      console.log(record);
    } catch (err) {
      console.log(err);
    }
  };
  const cart_insert = async (obj) => {
    // const new_cart = {};
    const cart = { ...obj.cart_detail };
    if (cart[obj.data.pid]) {
      cart[obj.data.pid]++;
    } else {
      cart[obj.data.pid] = 1;
    }
    console.log(cart);
    try {
      const result = await Cart_collec.findOneAndUpdate(
        { cust_id: obj.data.cust_id },
        { $set: { cart_detail: { ...cart } } },
        { new: true }
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  const find_cid = async (data) => {
    try {
      const record = await Cart_collec.find({
        cust_id: data.cust_id,
      });

      if (record.length > 0) {
        console.log("1");
        const obj = { data: data, cart_detail: record[0].cart_detail };
        cart_insert(obj);
      } else {
        console.log("0");
        new_cart_insert(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(req.body);
  const data = req.body;
  find_cid(req.body);
});

app.post("/api/displaycart", (req, res) => {
  // const [product_list, setproduct] = useState([]);
  var product = [];
  const get_product = async (data) => {
    try {
      const record = await Product_collec.find({
        _id: data.pid,
      });
      const obj = { ...record[0] };
      obj.order_qty = data.qty;
      // setproduct([...product_list, obj]);
      product = [...product, obj];
      console.log(product);
    } catch (err) {
      console.log(err);
    }
  };

  const find_cust = async (data) => {
    try {
      const record = await Cart_collec.find({
        cust_id: data,
      });

      if (record.length > 0) {
        console.log("1");
        // const obj = { data: data, cart_detail: record[0].cart_detail };
        // cart_insert(obj);
        // const items = Object.keys(record[0].cart_detail);
        // items.map(async (data) => {
        //   await get_product({ pid: data, qty: record[0].cart_detail[data] });
        // });
        res.send(record[0].cart_detail);
      } else {
        console.log("0");
        // new_cart_insert(data);
        res.send({ empty: true });
      }
      console.log(product);
      // console.log(product_list);s
    } catch (err) {
      console.log(err);
    }
  };
  const cust_id = req.body.id;
  find_cust(cust_id);
});

app.listen(port);
