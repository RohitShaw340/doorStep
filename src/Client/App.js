import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Search from "./components/Search";
import Signup from "./components/Signup";
import Customer_Home from "./components/Customer_Home";
import Vendor_Home from "./components/Vendor_Home";
import { useState } from "react";

import Footer from "./components/Footer";

function App() {
  const [v_data, setVData] = useState({});
  const [c_data, setCData] = useState({});
  const [cart_data, setCart_data] = useState({});
  const info = (info) => {
    if (info.type == "vendor") setVData(info);
    else setCData(info);
  };
  const cart_handler = (data) => {
    if (data.product_name) {
      setCart_data(data);
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Customer_Home"
              element={
                <Customer_Home
                  customer_data={c_data}
                  cart_data={cart_handler}
                />
              }
            ></Route>
            <Route
              path="/Vendor_Home"
              element={<Vendor_Home vendor_data={v_data} />}
            ></Route>
            <Route path="/Search" element={<Search />}></Route>
            <Route path="/Login" element={<Login get_data={info} />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/Cart" element={<Cart data={cart_data} />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
