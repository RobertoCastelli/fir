import React, { useState } from "react"

//--- FIREBASE
import { db } from "./firebase"
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  increment,
  onSnapshot,
} from "firebase/firestore"
//--- CONTEXT
export const ContextData = React.createContext()

export const ContextProvider = (props) => {
  //--- STATES
  const [cassoni, setCassoni] = useState([])
  const [cassone, setCassone] = useState([])
  const [mcInputCarico, setMcInputCarico] = useState(0)
  const [rifProgressivo, setRifProgressivo] = useState(0)
  /*   const [logs, setLogs] = useState([]) */
  /*   const [filteredState, setFilteredState] = useState([]) */

  //--- FIREBASE VARIABLES
  const docRefContatore = doc(db, "contatore", "KZHr4753xMnqTy0H3rBI")
  const collRefFir = collection(db, "fir")

  //--- GET DATE && YEAR
  const today = new Date().toLocaleDateString().slice(0, 4)
  const year = new Date()
    .getFullYear()
    .toString()
    .slice(-2)

  //--- UPDATE NUMERO PROGRESSIVO + 1
  const updateNumeroProgressivo = async () => {
    await updateDoc(docRefContatore, {
      prog: increment(1),
    })
  }

  //--- SHOW NUMERO PROGRESSIVO
  onSnapshot(docRefContatore, (doc) => setRifProgressivo(doc.data().prog))

  //--- SHOW CASSONI
  onSnapshot(collRefFir, (snapshot) => {
    let cassoneList = []
    snapshot.forEach((cassone) => {
      cassoneList.push({
        ...cassone.data(),
        id: cassone.id,
      })
      return setCassoni(cassoneList)
    })
  })

  //--- SHOW CASSONE SELEZIONATO
  const getCassoneSelezionato = async (id) => {
    const cassoneSnapshot = await getDoc(doc(db, "fir", id))
    if (cassoneSnapshot.exists()) {
      setCassone({
        ...cassoneSnapshot.data(),
        id: id,
      })
    } else {
      console.log("Cassone non presente nel database")
    }
  }

  //--- UPDATE DATI CASSONE SELEZIONATO {rif, mc, stato}
  const updateRifMcStateCassone = async (id) => {
    const cassoneRef = doc(db, "fir", id)
    await updateDoc(cassoneRef, {
      mcTotali: cassone.mcTotali + mcInputCarico,
      carico: [
        ...cassone.carico,
        { rif: rifProgressivo, mc: mcInputCarico, stato: false },
      ],
    })
  }

  //---****************---/
  //--- FASE DI CARICO ---/
  //---****************---/

  //--- UPDATE CASSONE SELEZIONATO
  //--- UPDATE NUMERO PROGRESSIVO
  //--- RESET MC INPUT
  //--- TORNA ALLA HOME PAGE
  const updateCassone = (id) => {
    updateRifMcStateCassone(id)
    updateNumeroProgressivo()
    setMcInputCarico(0)
  }

  /************************/
  /************************/
  /** START FASE SCARICO **/
  /************************/
  /************************/

  // GET ARRAY CARICHI NON ANCORA SCARICATI
  /*   const getFilteredStateCarico = (cer) => {
    Cassoni.map(
      (c) =>
        c.cer === cer &&
        setFilteredState(c.carico.filter((elem) => elem.stato === false))
    )
  } */
  /* 
  // CHECKBOX ==> CAMBIA STATO CARICO/SCARICO
  const handleChange = (index) => {
    selectedCer.map((elem) =>
      elem.carico.forEach((e, i) => {
        if (i === index) {
          return (e.stato = !e.stato)
        } else {
          return e
        }
      })
    )
    console.log(selectedCer[0].carico)
  }

  // AGGIORNA SCARICO ==> MC-TOTALI
  const updateDataSelectedCerScarico = (cer) => {
    setCassoni(
      Cassoni.map((c) => {
        if (c.cer === cer) {
          return {
            ...c,
            mcTotali: sommaCarichi(cer),
          }
        } else {
          return c
        }
      })
    )
  }

  // AGGIORNA TUTTI I DATI DELLO SCARICO
  const updateCersScarico = (cer) => {
    updateDataSelectedCerScarico(cer)
    updateMcTotaliSelectedCer(cer)
    incrementaRifProgressivo()
  } */
  /*^^^^^^^^^^^^^^^^^^^^*/
  /** END FASE SCARICO **/
  /*____________________*/

  //--- RENDER
  return (
    <ContextData.Provider
      value={{
        today,
        year,
        rifProgressivo,
        cassone,
        cassoni,
        getCassoneSelezionato,
        updateCassone,
        mcInputCarico,
        setMcInputCarico,
        /*  
      , */
        /*selectedCer,
        showSelectedCer,
     
        updateCersCarico,
        logs,
           filteredState,
        handleChange,
        updateCersScarico, */
      }}
    >
      {props.children}
    </ContextData.Provider>
  )
}
