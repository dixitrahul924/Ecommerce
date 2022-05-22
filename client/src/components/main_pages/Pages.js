import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { StateProvider } from "../../StateProvider";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Cart from "./cart/Cart";
import Products from "./Products/Products";
import NotFound from "./utils/notfoundpage/NotFound";

const Pages = () => {
  const state = useContext(StateProvider);

  return (
    <Routes>
      <Route path="/" exact element={<Products />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/cart" exact element={<Cart />} />
      <Route path="*" exact element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
