import { createContext } from "react";

export const StateProvider = createContext();

export const DataProvider = ({ children }) => {
  return (
    <StateProvider.Provider value={"statte value"}>
      {children}
    </StateProvider.Provider>
  );
};
