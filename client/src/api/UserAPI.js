import React, { useEffect, useState } from "react";
import axios from "../axios";

const UserAPI = (token) => {
  console.log(token);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          await axios
            .get("/user/info", {
              headers: { Authorization: token },
            })
            .then((res) => {
              setIsLogged(true);
              setUserInfo(res.data);
              res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
            });
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    if (!isLogged) return alert("Please login to continue buying");

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios
        .patch(
          "/user/addcart",
          { cart: [...cart, { ...product, quantity: 1 }] },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("This product has been added to cart.");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    userInfo: [userInfo, setUserInfo],
  };
};

export default UserAPI;
