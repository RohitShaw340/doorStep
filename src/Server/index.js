const express = require("express");
require("./db/login_db");
const Login_collec = require("./Models/Login_collection");
const Product_collec = require("./Models/Product_collection");
const Cart_collec = require("./Models/Cart_collection");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");
const Orders_collec = require("./Models/Orders_collec");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// LOGIN :-

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

// SIGNUP :-

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

// PRODUCTS:-

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

// SEARCH :-

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

// CART :-

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
  const find_cust = async (data) => {
    try {
      const record = await Cart_collec.find({
        cust_id: data,
      });

      if (record.length > 0) {
        console.log("1");
        res.send(record[0].cart_detail);
      } else {
        console.log("0");
        // new_cart_insert(data);
        res.send({ empty: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const cust_id = req.body.id;
  find_cust(cust_id);
});
app.post("/api/get_product_info_cart", (req, res) => {
  const get_product = async (data) => {
    try {
      const record = await Product_collec.find({
        _id: data,
      });
      res.send(record[0]);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(req.body);
  get_product(req.body.pid);
});

app.post("/api/update_add_cart", (req, res) => {
  const cart_insert = async (obj) => {
    const cart = { ...obj.cart_detail };
    if (cart[obj.data.pid]) {
      cart[obj.data.pid]++;
    } else {
      cart[obj.data.pid] = 1;
    }
    try {
      const result = await Cart_collec.findOneAndUpdate(
        { cust_id: obj.data.cust_id },
        { $set: { cart_detail: { ...cart } } },
        { new: true }
      );
      res.send(result.cart_detail);
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
        const obj = { data: data, cart_detail: record[0].cart_detail };
        cart_insert(obj);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(req.body);
  const data = req.body;
  find_cid(req.body);
});
app.post("/api/update_delete_cart", (req, res) => {
  const cart_insert = async (obj) => {
    const cart = { ...obj.cart_detail };
    if (cart[obj.data.pid] > 0) {
      cart[obj.data.pid]--;
    }
    try {
      const result = await Cart_collec.findOneAndUpdate(
        { cust_id: obj.data.cust_id },
        { $set: { cart_detail: { ...cart } } },
        { new: true }
      );
      res.send(result.cart_detail);
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
        const obj = { data: data, cart_detail: record[0].cart_detail };
        cart_insert(obj);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(req.body);
  const data = req.body;
  find_cid(req.body);
});

// ORDERS :-

app.post("/add/orders", (req, res) => {
  const d = req.body;
  console.log(d);
  const insert = async (data) => {
    try {
      const rec = new Orders_collec({
        cust_id: data.cid,
        order: data.order,
        status: "not dilivered",
      });
      const record = await rec.save();
      console.log(record);
    } catch (err) {
      console.log(err);
    }
  };
  const update_stock = async (data) => {
    try {
      const arr = Object.entries(data.order);
      console.log(arr);
      arr.map(async (rec) => {
        rec[1].map(async (products) => {
          const id = products[0];
          if (typeof id == "string") {
            // console.log(products, id);
            const result = await Product_collec.findOneAndUpdate(
              { _id: id },
              { $set: { stock: products[4] - products[2] } },
              { new: true }
            );
            console.log(result);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  const clear_cart = async (data) => {
    try {
      const result = await Cart_collec.findOneAndUpdate(
        { cust_id: data.cid },
        { $set: { cart_detail: {} } }
      );
    } catch (err) {
      console.log(err);
    }
  };
  update_stock(d);
  insert(d);
  clear_cart(d);
});

app.listen(port);
