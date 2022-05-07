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

  //--- FIREBASE VARIABLES
  const docRefContatore = doc(db, "contatore", "KZHr4753xMnqTy0H3rBI")
  const collRefFir = collection(db, "fir")

  //--- GET DATE && YEAR
  const today = new Date().toLocaleDateString().slice(0, 4)
  const year = new Date()
    .getFullYear()
    .toString()
    .slice(-2)

  //--- SHOW NUMERO PROGRESSIVO
  onSnapshot(docRefContatore, (doc) => setRifProgressivo(doc.data().prog))

  //--- UPDATE NUMERO PROGRESSIVO + 1
  const updateNumeroProgressivo = async () => {
    await updateDoc(docRefContatore, {
      prog: increment(1),
    })
  }

  //--- SHOW TUTTI I CASSONI
  onSnapshot(collRefFir, (snapshot) => {
    let cassoneList = []
    snapshot.docs.forEach((doc) => {
      cassoneList.push({
        ...doc.data(),
        id: doc.id,
        mcTotali: sommaCarichiNelCassone(doc.id),
      })
      setCassoni(cassoneList)
    })
  })

  //--- SHOW CASSONE SELEZIONATO
  const getCassoneSelezionato = async (id) => {
    const cassoneSnapshot = await getDoc(doc(db, "fir", id))
    if (cassoneSnapshot.exists()) {
      setCassone({
        ...cassoneSnapshot.data(),
        id: id,
        mcTotali: sommaCarichiNelCassone(id),
      })
    } else {
      console.log("Cassone non presente nel database")
    }
  }

  //--- SOMMA CARICHI NEL CASSONE
  const sommaCarichiNelCassone = (id) => {
    let contenitoreCarichi = []
    cassoni.map((cassone) => {
      return cassone.carico.forEach((carico) => {
        if (cassone.id === id) {
          contenitoreCarichi.push(carico.mc)
        } else {
          return cassone
        }
      })
    })
    return contenitoreCarichi.reduce((a, b) => a + b, 0)
  }

  //--- UPDATE DATI CASSONE SELEZIONATO {rif, mc, stato}
  const updateRifMcStateCassone = async (id) => {
    const cassoneRef = doc(db, "fir", id)
    await updateDoc(cassoneRef, {
      carico: [
        ...cassone.carico,
        { rif: rifProgressivo, mc: mcInputCarico, stato: false },
      ],
    })
  }

  /***********************/
  /***********************/
  /** START FASE CARICO **/
  /***********************/
  /***********************/

  //1.--- UPDATE CASSONE SELEZIONATO
  //2.--- UPDATE NUMERO PROGRESSIVO
  //3.--- RESET MC INPUT
  //4.---TODO: UPDATE LOG
  //5.---TODO: TORNA ALLA HOME PAGE
  const updateCassone = (id) => {
    updateRifMcStateCassone(id)
    updateNumeroProgressivo()
    setMcInputCarico(0)
  }

  //^^^^^^^^^^^^^^^^^//
  // END FASE CARICO //
  //_________________//

  /************************/
  /************************/
  /** START FASE SCARICO **/
  /************************/
  /************************/

  let elencoCarichi =
    cassone && cassone.filter((doc) => doc.carico.stato === false)

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
        elencoCarichi,
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
