import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { StateProvider } from "../../../StateProvider";
import { toast } from "react-toastify";

const ProductItem = (props) => {
  const state = useContext(StateProvider);
  const product = props.product;
  const isAdmin = props.isAdmin;
  const addCart = state.userAPI.addCart;
  console.log("props", props.product);
  return (
    <>
      <Link to={`/details/${product._id}`}>
        <div className="product_card">
          <img src={product?.images?.url} alt="" />

          <div className="product_box">
            <h2 title={product?.title}>{product?.title}</h2>
            <span>${product?.price}</span>
            <p>{product?.description}</p>
          </div>

          <div className="row_btn">
            {isAdmin ? (
              <>
                <Link to="#!">
                  <Button
                    variant="contained"
                    style={{ width: "120px", backgroundColor: "#ffcc00" }}
                  >
                    Delete
                  </Button>
                </Link>
                <Link to="#!">
                  <Button
                    variant="contained"
                    style={{ width: "120px", backgroundColor: "#000000" }}
                  >
                    Edit
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link to="/">
                  <Button
                    variant="contained"
                    style={{
                      width: "100%",
                      backgroundColor: "#ffcc00",
                      color: "#000000",
                    }}
                    onClick={() => {
                      toast.dark(`${product.title} is added to cart`);
                      addCart(product);
                    }}
                  >
                    Add to cart
                  </Button>
                </Link>
              </>
            )}
            {/* <Button
          variant="contained"
          style={{ width: "120px", backgroundColor: "#000000" }}
        >
          View
        </Button> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductItem;
