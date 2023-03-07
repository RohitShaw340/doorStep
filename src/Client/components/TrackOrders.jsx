import React from "react";
import { useNavigate } from "react-router-dom";

const TrackOrders = () => {
  const navigate = useNavigate();
  window.onpopstate = () => {
    navigate("/Customer_Home");
  };
  return <div>TrackOrders</div>;
};

export default TrackOrders;
