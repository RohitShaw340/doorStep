const mongo_conn = require("mongoose");
mongo_conn.set("strictQuery", true);
mongo_conn
  .connect("mongodb://127.0.0.1:27017/DoorStep_api")
  .then(() => {
    console.log("conn is succcessfull");
  })
  .catch((err) => {
    console.log(err);
  });
