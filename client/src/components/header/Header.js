import React, { useContext, useState } from "react";
import { StateProvider } from "../../StateProvider";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const state = useContext(StateProvider);

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Ecomm</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>

        <li>
          <Link to="/login">Login / Register</Link>
        </li>
      </ul>

      <div className="cart-icon">
        <span>0</span>
        <Link to="/cart">
          <ShoppingCartIcon />
        </Link>
      </div>
    </header>
  );
};

export default Header;
