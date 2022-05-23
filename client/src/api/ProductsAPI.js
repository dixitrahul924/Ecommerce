import React, { useEffect, useState } from "react";
import axios from "../axios";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`/api/products`);
      setProducts(res?.data?.products);
      //   setResult(res.data.result);
    };
    getProducts();
  }, []);
  return { products: [products, setProducts] };
};

export default ProductsAPI;
