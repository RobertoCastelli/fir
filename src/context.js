import React, { useState, useEffect } from "react"
// DATABASE
import { cers } from "./variables/cers"
// CONTEXT
export const ContextData = React.createContext()

export const ContextProvider = (props) => {
  // STATE
  const [cersDb, setCersDb] = useState(cers)
  const [selectedCer, setSelectedCer] = useState([])
  const [rifProgressivo, setRifProgressivo] = useState(0)
  const [mcCarico, setMcCarico] = useState(0)
  const [log, setLog] = useState([])

  // GET DATE
  const today = new Date().toLocaleDateString()

  // GET SELECTED CER
  const getCer = (cer) => setSelectedCer(cersDb.filter((c) => c.cer === cer))

  // AGGIORNA RIFERIMENTO PROGRESSIVO
  useEffect(() => setRifProgressivo(log.length), [log])

  // AGGIORNA MC NEL CER
  const updateMcSelectedCer = (cer) => {
    setCersDb(
      cersDb.map((c) => {
        if (c.cer === cer) {
          let mcAggiornati = parseInt(mcCarico) + parseInt(c.mc)
          setSelectedCer([{ ...selectedCer[0], mc: mcAggiornati }])
          return { ...c, mc: mcAggiornati }
        } else {
          return c
        }
      })
    )
  }

  // AGGIORNA LOG
  const updateLog = (cer) =>
    setLog([...log, `${today} - CER ${cer}, caricati mc ${mcCarico}`])

  // CARICO MC MATERIALE
  const caricoMateriale = (cer) => {
    if (mcCarico !== 0) {
      if (window.confirm(`conferma carico di mc ${mcCarico}`)) {
        updateMcSelectedCer(cer)
        updateLog(cer)
        setMcCarico()
      }
    } else {
      alert("inserisci un numero valido")
    }
  }

  return (
    <ContextData.Provider
      value={{
        getCer,
        selectedCer,
        cersDb,
        caricoMateriale,
        setMcCarico,
        rifProgressivo,
        log,
      }}
    >
      {props.children}
    </ContextData.Provider>
  )
}
