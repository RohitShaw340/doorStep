const express = require("express");
require("./db/login_db");
const Login_collec = require("./Models/Login_collection");
const Product_collec = require("./Models/Product_collection");
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

app.listen(port);
