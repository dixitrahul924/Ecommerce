import React, { useContext, useState } from "react";
import { StateProvider } from "../../StateProvider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import axios from "../../axios";

const Header = () => {
  const state = useContext(StateProvider);
  console.log("in header", state);

  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [userInfo] = state.userAPI.userInfo;

  console.log(isLogged, isAdmin);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    setIsLogged(false);
    setIsAdmin(false);

    window.location.href = "/";
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Ecomm</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">SHOP</Link>
        </li>

        {isAdmin && (
          <li>
            <Link to="/create_product">Create Product</Link>
          </li>
        )}

        {isLogged ? (
          <>
            <li>
              <Link to={`/history/${userInfo._id}`}>Orders</Link>
            </li>
            <li>
              <Link to="/" onClick={logoutUser}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login / Register</Link>
            </li>
          </>
        )}
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <ShoppingCartIcon />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
