import React from "react";

export const ContextData = React.createContext();

export const ContextProvider = (props) => {
  const today = new Date().toLocaleDateString();
  console.log(today);

  return (
    <ContextData.Provider value={{ today }}>
      {props.children}
    </ContextData.Provider>
  );
};
