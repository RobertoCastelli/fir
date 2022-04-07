import React, { useState } from "react";
// DATABASE
import { cers } from "./variables/cers";
// CONTEXT
export const ContextData = React.createContext();

export const ContextProvider = (props) => {
  // STATE
  const [selectedCer, setSelectedCer] = useState([]);

  // CARICO MATERIALE
  const caricoMateriale = () => console.log("ciao");

  //INCREMENTA NUMERO PROGRESSIVO CARICO

  // GET SELECTED CER
  const getCer = (cer) => setSelectedCer(cers.filter((c) => c.cer === cer));

  return (
    <ContextData.Provider
      value={{ caricoMateriale, getCer, selectedCer, cers }}
    >
      {props.children}
    </ContextData.Provider>
  );
};
