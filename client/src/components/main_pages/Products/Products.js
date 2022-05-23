import React, { useContext } from "react";
import { StateProvider } from "../../../StateProvider";
import ProductItem from "./ProductItem";
import Loader from "../utils/loading/Loader";

function Products() {
  const state = useContext(StateProvider);
  const [products] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  //   console.log("products", products);
  return (
    <>
      <div className="products">
        {products.map((product) => {
          {
            /* console.log("pro", product); */
          }
          return (
            <ProductItem
              key={product?._id}
              product={product}
              isAdmin={isAdmin}
            />
          );
        })}
      </div>
      {products.length === 0 && (
        <div style={{ width: "10%", margin: "auto" }}>
          <Loader />
        </div>
      )}
    </>
  );
}

export default Products;
