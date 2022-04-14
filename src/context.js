import React, { useState, useEffect } from "react"
// DATABASE
import { cers } from "./variables/cers"
// CONTEXT
export const ContextData = React.createContext()

export const ContextProvider = (props) => {
  // STATE
  const [cersDb, setCersDb] = useState(cers)
  const [selectedCer, setSelectedCer] = useState([])
  const [mcInputCarico, setMcInputCarico] = useState(0)
  const [rifProgressivo, setRifProgressivo] = useState(1)
  /*
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]); */

  // GET DATE
  const today = new Date().toLocaleDateString()

  // GET SELECTED CER
  const getSelectedCer = (cer) =>
    setSelectedCer(cersDb.filter((c) => c.cer === cer))

  // INCREMENTA RIF. PROGRESSIVO
  const incrementaRifProgressivo = () => setRifProgressivo(rifProgressivo + 1)

  const updateMcSelectedCer = (cer) => {
    setCersDb(
      cersDb.map((c) => {
        if (c.cer === cer) {
          return {
            ...c,
            mcTotali: parseInt(c.mcTotali) + parseInt(mcInputCarico),
            carico: [
              ...c.carico,
              { rif: rifProgressivo, mc: mcInputCarico, stato: false },
            ],
          }
        } else {
          return c
        }
      })
    )
  }

  useEffect(() => {
    setSelectedCer([{ ...selectedCer[0], mcTotali: 3 }])
    setMcInputCarico(0)
    incrementaRifProgressivo()
  }, [cersDb])

  /*   // GET SELECTED CER CARICO
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
        attivita: "Carico",
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
    setFilteredLogs(logs.filter((log) => log.cer === cer)); */

  return (
    <ContextData.Provider
      value={{
        cersDb,
        selectedCer,
        getSelectedCer,
        mcInputCarico,
        setMcInputCarico,
        rifProgressivo,
        updateMcSelectedCer,
        /*      getCerCarico,
        getCerScarico,
        selectedCer,
        caricoMateriale,
        mcCarico,
        setMcCarico,
        rifProgressivo,
        logs,
        logFiltered,
        filteredLogs, */
      }}
    >
      {props.children}
    </ContextData.Provider>
  )
}
