import { createContext, useEffect, useState } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import axios from "./axios";

export const StateProvider = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    console.log("local", firstLogin);
    if (firstLogin) {
      const refreshToken = async () => {
        await axios
          .get("/user/refresh_token", {
            withCredentials: true,
            credentials: "include",
          })
          .then((res) => {
            console.log("res referesh", res);
            setToken(res.data.accesstoken);
          })
          .catch((e) => {
            console.log("error", e);
          });
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };

      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
  };

  console.log("state", state);
  return (
    <StateProvider.Provider value={state}>{children}</StateProvider.Provider>
  );
};
