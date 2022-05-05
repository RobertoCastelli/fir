import React, { useState, useEffect } from "react"

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
    snapshot.docs.forEach((doc) => {
      cassoneList.push({
        ...doc.data(),
        id: doc.id,
      })
      setCassoni(cassoneList)
    })
  })

  useEffect(() => {
    const somme = () => {
      cassoni.map((cassone) => {
        let arr = []
        return cassone.carico.forEach((carico) => {
          arr.push(carico.mc)
          let arrsomma = arr.reduce((a, b) => a + b, 0)
          const upcas = doc(db, "fir", cassone.id)
          updateDoc(upcas, {
            mcTotali: arrsomma,
          })
        })
      })
    }
    return () => {
      somme()
    }
  }, [rifProgressivo])

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
