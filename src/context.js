import React, { useState } from "react";
// DATABASE
import { cers } from "./variables/cers";
// CONTEXT
export const ContextData = React.createContext();

export const ContextProvider = (props) => {
  // STATE
  const [cersDb, setCersDb] = useState(cers);
  const [selectedCer, setSelectedCer] = useState([]);
  const [rifProgressivo, setRifProgressivo] = useState(1);
  const [mcCarico, setMcCarico] = useState(0);
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  // GET DATE
  const today = new Date().toLocaleDateString();

  // GET SELECTED CER CARICO
  const getCerCarico = (cer) => {
    setSelectedCer(cersDb.filter((c) => c.cer === cer));
  };

  // GET SELECTED CER SCARICO
  const getCerScarico = (cer) => {
    setSelectedCer(cersDb.filter((c) => c.cer === cer));
    logFiltered(cer);
  };

  // AGGIORNA MC NEL CER + SET RIFERIMENTO PROGRESSIVO
  const updateMcSelectedCer = (cer) => {
    setCersDb(
      cersDb.map((c) => {
        if (c.cer === cer) {
          let mcAggiornati = parseInt(mcCarico) + parseInt(c.mc);
          setSelectedCer([{ ...selectedCer[0], mc: mcAggiornati }]);
          setRifProgressivo(logs.length + 2);
          return { ...c, mc: mcAggiornati };
        } else {
          return c;
        }
      })
    );
  };

  // AGGIORNA LOG CARICO
  const updateLogCarico = (cer) => {
    setLogs([
      ...logs,
      {
        today,
        cer,
        rifProgressivo,
        mcCarico,
        attivita: "C",
      },
    ]);
  };

  // CARICO MC MATERIALE
  const caricoMateriale = (cer) => {
    if (mcCarico !== 0) {
      if (window.confirm(`conferma carico di mc ${mcCarico}`)) {
        updateMcSelectedCer(cer);
        updateLogCarico(cer);
        setMcCarico(0);
      }
    } else {
      alert("inserisci un numero di mc valido");
    }
  };

  // FILTRA LOG PER CER
  const logFiltered = (cer) =>
    setFilteredLogs(logs.filter((log) => log.cer === cer));

  return (
    <ContextData.Provider
      value={{
        getCerCarico,
        getCerScarico,
        selectedCer,
        cersDb,
        caricoMateriale,
        mcCarico,
        setMcCarico,
        rifProgressivo,
        logs,
        logFiltered,
        filteredLogs,
      }}
    >
      {props.children}
    </ContextData.Provider>
  );
};
