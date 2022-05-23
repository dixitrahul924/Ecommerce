import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { StateProvider } from "../../StateProvider";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Cart from "./cart/Cart";
import DetailProduct from "./detailProduct/DetailProduct";
import Order from "./Order/Order";
import Products from "./Products/Products";
import NotFound from "./utils/notfoundpage/NotFound";
import OrderHistory from "./orderHistory/OrderHistory";
import OrderDetails from "./orderHistory/OrderDetails";

const Pages = () => {
  const state = useContext(StateProvider);

  const [isLogged] = state.userAPI.isLogged;

  return (
    <Routes>
      <Route path="/" exact element={<Products />} />
      <Route path="/details/:id" exact element={<DetailProduct />} />

      <Route
        path="/login"
        exact
        element={isLogged ? <NotFound /> : <Login />}
      />
      <Route
        path="/register"
        exact
        element={isLogged ? <NotFound /> : <Register />}
      />
      <Route path="/cart" exact element={<Cart />} />
      <Route path="/place_order" exact element={<Order />} />
      <Route path="/history/:user_id" exact element={<OrderHistory />} />
      <Route path="/order_view/:order_id" exact element={<OrderDetails />} />

      <Route path="*" exact element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
