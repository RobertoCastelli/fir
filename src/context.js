import React, { useState } from "react"
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
  const [sommaMcTotali, setSommaMcTotali] = useState(0)
  const [logs, setLogs] = useState([])

  /*
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]); */

  // GET DATE
  const today = new Date().toLocaleDateString()

  // MOSTRA CER SELEZIONATO
  const showSelectedCer = (cer) =>
    setSelectedCer(cersDb.filter((c) => c.cer === cer))

  // AGGIORNA MC-TOTALI NEL CER SELEZIONATO
  const updateMcTotaliSelectedCer = () =>
    setSelectedCer([{ ...selectedCer[0], mcTotali: sommaMcTotali }])

  // INCREMENTA RIF. PROGRESSIVO
  const incrementaRifProgressivo = () => setRifProgressivo(rifProgressivo + 1)

  //TODO: SOMMA MC-TOTALI DEI CARICHI
  const sommaCarichi = () => {}

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
    ])
  }

  // AGGIORNA MC, MC-TOTALI, RIF, STATO NEL CERDB
  const updateDataSelectedCer = (cer) => {
    setCersDb(
      cersDb.map((c) => {
        if (c.cer === cer) {
          return {
            ...c,
            mcTotali: sommaMcTotali,
            carico: [
              ...c.carico,
              {
                rif: rifProgressivo,
                mc: mcInputCarico,
                stato: false,
              },
            ],
          }
        } else {
          return c
        }
      })
    )
  }
  console.log(cersDb)

  // AGGIORNA I DATI
  const updateCers = (cer) => {
    updateDataSelectedCer(cer)
    updateLog(cer)
    updateMcTotaliSelectedCer()
    incrementaRifProgressivo()
    setMcInputCarico(0)
  }

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
        updateCers,
        logs,
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
