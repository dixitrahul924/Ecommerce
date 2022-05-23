import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { StateProvider } from "../../../StateProvider";
import axios from "../../../axios";
const Order = () => {
  const params = useLocation();
  console.log(params);
  const state = useContext(StateProvider);
  const [user] = state.userAPI.userInfo;
  const [isLogged] = state.userAPI.isLogged;
  const [cart, setCart] = state.userAPI.cart;
  const token = state.token;
  console.log(token);

  //   console.log(user._id, user.email);

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    address: "",
    mobile: "",
    orderTotal: params.state,
    cart: cart,
    user_id: user._id,
    email: user.email,
    status: true,
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setOrderInfo({ ...orderInfo, [name]: value });
  };

  const OrderSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("orderInfo", orderInfo);
      await axios
        .post(
          "/order/detail",
          { ...orderInfo },
          {
            headers: { Authorization: token[0] },
          }
        )
        .then((res) => {
          console.log(res.data);
          window.alert("Order Placed Successfully");
          window.location = `/order_view/${res.data._id}`;
          window.reload();
        });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="order-page">
      <form onSubmit={OrderSubmit}>
        <h2>Order details</h2>

        <h3>
          <br></br>Order Total ::{" "}
          <span style={{ color: "brown" }}>${params.state}</span>
        </h3>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={onChangeInput}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={onChangeInput}
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          onChange={onChangeInput}
          required
        />

        <div className="row">
          <Button type="submit">Proceed</Button>
        </div>
      </form>
    </div>
  );
};

export default Order;
