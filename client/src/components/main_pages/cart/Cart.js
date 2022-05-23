import React, { useContext, useEffect, useState } from "react";
import { StateProvider } from "../../../StateProvider";
import axios from "../../../axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useContext(StateProvider);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;

  console.log("cart", cart[0]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };
  if (cart.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Cart is empty</h2>;
  }
  return (
    <div>
      <div className="total">
        <h3>
          Order Total : <span style={{ color: "brown" }}>$ {total}</span>
        </h3>
        <Link to="/place_order" state={total}>
          <Button variant="outlined">Place Order</Button>
        </Link>
      </div>
      <div className="cart__container">
        {cart.map((product, i) => (
          <div className="cart__items" key={i}>
            <img src={product.images.url} alt="" className="image-box" />

            <div className="box-detail">
              <div className="row">
                <p className="title">{product.title}</p>
                <h6>#id: {product.product_id}</h6>
              </div>
              <div className="counter">
                <button
                  onClick={() => decrement(product._id)}
                  className="count"
                >
                  {" "}
                  -{" "}
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() => increment(product._id)}
                  className="count"
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  margin: "10px 0",
                }}
              >
                <Button
                  className="remove"
                  onClick={() => removeProduct(product._id)}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
                <p className="prices">$ {product.price * product.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
