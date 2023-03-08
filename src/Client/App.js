import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Search from "./components/Search";
import Signup from "./components/Signup";
import Customer_Home from "./components/Customer_Home";
import Vendor_Home from "./components/Vendor_Home";
import TrackOrders from "./components/TrackOrders";
import { useState } from "react";

import Footer from "./components/Footer";
import Checkout from "./components/Checkout";

function App() {
  const [v_data, setVData] = useState({});
  const [c_data, setCData] = useState({});
  // const [cart_data, setCart_data] = useState("");
  const info = (info) => {
    if (info.type == "vendor") setVData(info);
    else setCData(info);
  };
  const logout = () => {
    console.log("cleared");
    setCData({
      email: "no_id",
    });
  };
  // const cart_handler = (data) => {
  //   if (data) {
  //     setCart_data(data);
  //   }
  // };
  // const reset = (data) => {
  //   if (data == "reset") {
  //     setCart_data("");
  //   }
  // };
  return (
    <div className="App">
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Customer_Home"
              element={
                <Customer_Home clear_cust={logout} customer_data={c_data} />
              }
            ></Route>
            <Route
              path="/Vendor_Home"
              element={<Vendor_Home vendor_data={v_data} />}
            ></Route>
            {console.log(c_data)}
            <Route path="/Search" element={<Search cid={c_data} />}></Route>
            <Route path="/Login" element={<Login get_data={info} />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/Cart" element={<Cart cid={c_data} />}></Route>
            <Route
              path="/Checkout"
              element={<Checkout data={c_data} />}
            ></Route>
            <Route
              path="/TrackOrder"
              element={<TrackOrders cid={c_data} />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
