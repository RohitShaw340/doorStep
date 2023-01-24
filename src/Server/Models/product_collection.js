const mongo_conn = require("mongoose");
// const validator = require("validator");
const login_schema = new mongo_conn.Schema({
  seller_id: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Login = new mongo_conn.model("doorstep_api", login_schema);
module.exports = Login;
