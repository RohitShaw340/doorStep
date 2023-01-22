const express = require("express");
require("./db/login_db");
const Login_collec = require("./Models/Login_collection");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

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
    } catch (err) {
      console.log(err);
    }
  };
  insert();
});

app.listen(port);