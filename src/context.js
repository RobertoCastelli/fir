import React from "react";

export const ContextData = React.createContext();

export const ContextProvider = (props) => {
  const today = new Date().toLocaleDateString();

  return (
    <ContextData.Provider value={{ today }}>
      {props.children}
    </ContextData.Provider>
  );
};
