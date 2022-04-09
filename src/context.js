import React, { useState } from "react";
// DATABASE
import { cers } from "./variables/cers";
// CONTEXT
export const ContextData = React.createContext();

export const ContextProvider = (props) => {
  // STATE
  const [cersDb, setCersDb] = useState(cers);
  const [selectedCer, setSelectedCer] = useState([]);
  const [rifProgressivo, setRifProgressivo] = useState(0);
  const [mcCarico, setMcCarico] = useState(0);

  // GET SELECTED CER
  const getCer = (cer) => setSelectedCer(cersDb.filter((c) => c.cer === cer));

  // INCREMENTA RIFERIMENTO PROGRESSIVO
  const incrementaRifProgressivo = () => setRifProgressivo(rifProgressivo + 1);

  // AGGIORNA MC NEL CER
  const updateMcSelectedCer = (cer) => {
    setCersDb(
      cersDb.map((c) => {
        if (c.cer === cer) {
          let mcAggiornati = parseInt(mcCarico) + parseInt(c.mc);
          setSelectedCer([{ ...selectedCer[0], mc: mcAggiornati }]);
          return { ...c, mc: mcAggiornati };
        } else {
          return c;
        }
      })
    );
  };

  // CARICO MATERIALE + INCREMENTO RIF PROGRESSIVO
  const caricoMateriale = (cer) => {
    if (mcCarico !== 0) {
      if (window.confirm(`conferma carico di mc ${mcCarico}`)) {
        updateMcSelectedCer(cer);
        incrementaRifProgressivo();
      }
    } else {
      alert("inserisci un numero valido");
    }
  };

  return (
    <ContextData.Provider
      value={{
        getCer,
        selectedCer,
        cersDb,
        caricoMateriale,
        setMcCarico,
        rifProgressivo,
      }}
    >
      {props.children}
    </ContextData.Provider>
  );
};
