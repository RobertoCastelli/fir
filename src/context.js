import React, { useState } from "react";
// DATABASE
import { cers } from "./variables/cers";
// CONTEXT
export const ContextData = React.createContext();

export const ContextProvider = (props) => {
  // STATE
  const [cersDb, setCersDb] = useState(cers);
  const [selectedCer, setSelectedCer] = useState([]);
  const [mcInputCarico, setMcInputCarico] = useState(0);
  const [rifProgressivo, setRifProgressivo] = useState(1);
  const [logs, setLogs] = useState([]);
  const [filteredState, setFilteredState] = useState([]);

  // GET DATE
  const today = new Date().toLocaleDateString().slice(0, 4);

  // MOSTRA CER SELEZIONATO
  const showSelectedCer = (cer) => {
    setSelectedCer(cersDb.filter((c) => c.cer === cer));
    return getFilteredStateCarico(cer);
  };

  // INCREMENTA RIF. PROGRESSIVO
  const incrementaRifProgressivo = () => setRifProgressivo(rifProgressivo + 1);

  // AGGIORNA MC-TOTALI NEL CER SELEZIONATO
  const updateMcTotaliSelectedCer = (cer) =>
    setSelectedCer([{ ...selectedCer[0], mcTotali: sommaCarichi(cer) }]);

  // SOMMA MC-TOTALI DEI CARICHI
  const sommaCarichi = (cer) => {
    let arr = [mcInputCarico];
    cersDb.map((c) => {
      if (c.cer === cer) {
        return c.carico.forEach((e) => arr.push(e.mc));
      } else {
        return c;
      }
    });
    return arr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  };

  // AGGIORNA CARICO MC, MC-TOTALI, RIF, STATO NEL CERDB
  const updateDataSelectedCerCarico = (cer) => {
    setCersDb(
      cersDb.map((c) => {
        if (c.cer === cer) {
          return {
            ...c,
            mcTotali: sommaCarichi(cer),
            carico: [
              ...c.carico,
              {
                rif: rifProgressivo,
                mc: mcInputCarico,
                stato: false,
              },
            ],
          };
        } else {
          return c;
        }
      })
    );
  };
  console.log(cersDb);

  // AGGIORNA LOG CARICO
  const updateLog = (cer) => {
    setLogs([
      ...logs,
      {
        today,
        cer,
        rifProgressivo,
        mcInputCarico,
      },
    ]);
  };

  // GET CARICHI NON ANCORA SCARICATI
  const getFilteredStateCarico = (cer) => {
    setFilteredState(
      cersDb.map((c) => {
        if (c.cer === cer) {
          return cersDb.map((cer) =>
            cer.carico.filter((c) => c.stato === false)
          );
        } else {
          return c;
        }
      })
    );
  };

  // AGGIORNA I DATI
  const updateCersCarico = (cer) => {
    updateDataSelectedCerCarico(cer);
    updateLog(cer);
    updateMcTotaliSelectedCer(cer);
    incrementaRifProgressivo();
    setMcInputCarico(0);
  };

  /*   // GET SELECTED CER CARICO
  const getCerCarico = (cer) => {
    setSelectedCer(cersDb.filter((c) => c.cer === cer));
  };

  // GET SELECTED CER SCARICO
  const getCerScarico = (cer) => {
    setSelectedCer(cersDb.filter((c) => c.cer === cer));

  // INCREMENTA RIF. PROGRESSIVO
  const incrementaRiferimentoProgressivo = () =>
    setRifProgressivo(rifProgressivo + 1);

  // GET SELECTED CER
  // const getCer = (cer) => {
  //   setSelectedCer(cersDb.filter((c) => c.cer === cer));
  //   logFiltered(cer);
  // };

  // // AGGIORNA MC NEL CER + SET RIFERIMENTO PROGRESSIVO
  // const updateMcSelectedCer = (cer) => {
  //   setCersDb(
  //     cersDb.map((c) => {
  //       if (c.cer === cer) {
  //         let mcAggiornati = parseInt(mcCarico) + parseInt(c.mc);
  //         setSelectedCer([
  //           {
  //             ...selectedCer[0],
  //             mc: mcAggiornati,
  //             carico: [...mcCarico, mcCarico],
  //           },
  //         ]);
  //         setRifProgressivo(logs.length + 2);
  //         return { ...c, mc: mcAggiornati };
  //       } else {
  //         return c;
  //       }
  //     })
  //   );
  // };
  // console.log(selectedCer);

  // // AGGIORNA LOG CARICO
  // const updateLogCarico = (cer) => {
  //   setLogs([
  //     ...logs,
  //     {
  //       today,
  //       cer,
  //       rifProgressivo,
  //       mcCarico,
  //       attivita: "Carico",
  //     },
  //   ]);
  // };

  // FILTRA LOG PER CER
  const logFiltered = (cer) =>
    setFilteredLogs(logs.filter((log) => log.cer === cer)); */

  return (
    <ContextData.Provider
      value={{
        today,
        cersDb,
        selectedCer,
        showSelectedCer,
        mcInputCarico,
        setMcInputCarico,
        rifProgressivo,
        updateCersCarico,
        logs,
        filteredState,
      }}
    >
      {props.children}
    </ContextData.Provider>
  );
};
