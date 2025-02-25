import React, { createContext, useRef, useContext } from "react";

const RefContext = createContext();

export const RefProvider = ({ children }) => {
  const hotTableRef = useRef();
  return (
    <RefContext.Provider value={hotTableRef}>{children}</RefContext.Provider>
  );
};

export const useHotTableRef = () => {
  return useContext(RefContext);
};
