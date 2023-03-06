const mongo_conn = require("mongoose");
const order_schema = new mongo_conn.Schema({
  cust_id: {
    type: String,
    require: true,
  },
  order: {
    type: Object,
    reqire: true,
  },
  status: String,
});
const orders = new mongo_conn.model("Orders", order_schema);
module.exports = orders;
