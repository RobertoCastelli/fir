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

  // GET DATE && YEAR
  const today = new Date().toLocaleDateString().slice(0, 4);
  const year = new Date().getFullYear().toString().slice(-2);

  // INCREMENTA RIF. PROGRESSIVO CARICO/SCARICO
  const incrementaRifProgressivo = () => setRifProgressivo(rifProgressivo + 1);

  // PRENDI CASSONE SELEZIONATO
  const showSelectedCer = (cer) => {
    setSelectedCer(cersDb.filter((c) => c.cer === cer));
    return getFilteredStateCarico(cer);
  };

  // SOMMA MC-TOTALI DEI CARICHI DEL CASSONE
  const sommaCarichi = (cer) => {
    let arr = [mcInputCarico];
    cersDb.map((c) => {
      if (c.cer === cer) {
        return c.carico.forEach((e) => e.stato === false && arr.push(e.mc));
      } else {
        return c;
      }
    });
    return arr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  };

  // AGGIORNA MC-TOTALI NEL CASSONE SELEZIONATO
  const updateMcTotaliSelectedCer = (cer) =>
    setSelectedCer([{ ...selectedCer[0], mcTotali: sommaCarichi(cer) }]);

  /***********************/
  /***********************/
  /** START FASE CARICO **/
  /***********************/
  /***********************/

  // AGGIORNA CARICO ==> MC, MC-TOTALI, RIF. PROGRESSIVO E STATO NEI CASSONI
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

  // AGGIORNA LOG CARICO
  const updateLogCarico = (cer) => {
    setLogs([
      ...logs,
      {
        today,
        cer,
        year,
        rifProgressivo,
        mcInputCarico,
      },
    ]);
  };

  // AGGIORNA TUTTI I DATI DEL CARICO
  const updateCersCarico = (cer) => {
    if (
      mcInputCarico !== 0 &&
      window.confirm(
        `⚠️ CARICO CER ${selectedCer[0].cer} - rif.${rifProgressivo}/${year} ➟ ${mcInputCarico} mc?`
      )
    ) {
      updateDataSelectedCerCarico(cer);
      updateMcTotaliSelectedCer(cer);
      updateLogCarico(cer);
      incrementaRifProgressivo();
      setMcInputCarico(0);
    } else {
      alert("❌ Carico annullato!");
    }
  };
  console.log(filteredState, cersDb, "dopo carico");
  /*^^^^^^^^^^^^^^^^^^^*/
  /** END FASE CARICO **/
  /*___________________*/

  /************************/
  /************************/
  /** START FASE SCARICO **/
  /************************/
  /************************/

  // GET ARRAY CARICHI NON ANCORA SCARICATI
  const getFilteredStateCarico = (cer) => {
    cersDb.map(
      (c) =>
        c.cer === cer &&
        setFilteredState(c.carico.filter((elem) => elem.stato === false))
    );
  };

  // CHECKBOX ==> CAMBIA STATO CARICO/SCARICO
  const handleChange = (index) => {
    selectedCer.map((elem) =>
      elem.carico.forEach((e, i) => {
        if (i === index) {
          return (e.stato = !e.stato);
        } else {
          return e.stato;
        }
      })
    );
  };

  // AGGIORNA SCARICO ==> MC-TOTALI
  const updateDataSelectedCerScarico = (cer) => {
    setCersDb(
      cersDb.map((c) => {
        if (c.cer === cer) {
          return {
            ...c,
            mcTotali: sommaCarichi(cer),
          };
        } else {
          return c;
        }
      })
    );
  };

  // AGGIORNA LOG SCARICO
  const updateLogScarico = (cer) => {
    setLogs([
      ...logs,
      {
        today,
        cer,
        year,
        rifProgressivo,
      },
    ]);
  };

  // AGGIORNA TUTTI I DATI DELLO SCARICO
  const updateCersScarico = (cer) => {
    updateDataSelectedCerScarico(cer);
    updateMcTotaliSelectedCer(cer);
    updateLogScarico(cer);
    incrementaRifProgressivo();
    console.log(filteredState, cersDb, "dopo scarico");
  };
  /*^^^^^^^^^^^^^^^^^^^^*/
  /** END FASE SCARICO **/
  /*____________________*/

  return (
    <ContextData.Provider
      value={{
        today,
        year,
        cersDb,
        selectedCer,
        showSelectedCer,
        mcInputCarico,
        setMcInputCarico,
        rifProgressivo,
        updateCersCarico,
        logs,
        filteredState,
        handleChange,
        updateCersScarico,
      }}
    >
      {props.children}
    </ContextData.Provider>
  );
};
