import React, { useState } from "react";
import { cers } from "./variables/cers";
// DATABASE

export const ContextData = React.createContext();

export const ContextProvider = (props) => {
  // CARICO MATERIALE
  const caricoMateriale = () => console.log("ciao");

  // STATE
  const [selectedCer, setSelectedCer] = useState([]);

  // GET SELECTED CER
  const getCer = (cer) => setSelectedCer(cers.filter((c) => c.cer === cer));

  return (
    <ContextData.Provider value={{ caricoMateriale, getCer, selectedCer }}>
      {props.children}
    </ContextData.Provider>
  );
};
