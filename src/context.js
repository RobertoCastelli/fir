import React, { useState, useEffect } from "react"
//--- NAVIGATE
import { useNavigate } from "react-router-dom"
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
  const [checkedStateCarico, setCheckedStateCarico] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //--- FIREBASE VARIABLES
  const docRefContatore = doc(db, "contatore", "KZHr4753xMnqTy0H3rBI")
  const collRefFir = collection(db, "fir")

  //--- GET DATE && YEAR
  const today = new Date().toLocaleDateString().slice(0, 4)
  const year = new Date()
    .getFullYear()
    .toString()
    .slice(-2)

  const navigate = useNavigate()

  /***********************/
  /***********************/
  /** START FASE CARICO **/
  /***********************/
  /***********************/

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
    setIsLoading(true)
    const cassoneSnapshot = await getDoc(doc(db, "fir", id))
    if (cassoneSnapshot.exists()) {
      setCassone({
        ...cassoneSnapshot.data(),
        id: id,
        mcTotali: sommaCarichiNelCassone(id),
      })
      setIsLoading(false)
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
    setIsLoading(true)
    const cassoneRef = doc(db, "fir", id)
    await updateDoc(cassoneRef, {
      carico: [
        ...cassone.carico,
        { rif: rifProgressivo, mc: mcInputCarico, stato: false },
      ],
    })
    setIsLoading(false)
  }

  //1.--- UPDATE CASSONE SELEZIONATO
  //2.--- UPDATE NUMERO PROGRESSIVO
  //3.--- RESET MC INPUT
  //4.---TODO: UPDATE LOG

  const updateCassoneCarico = (id) => {
    if (
      mcInputCarico !== 0 &&
      window.confirm(
        `Premi OK per confermare carico ${mcInputCarico} mc, rif. ${rifProgressivo}`
      )
    ) {
      updateRifMcStateCassone(id)
      updateNumeroProgressivo()
      setMcInputCarico(0)
      setTimeout(() => {
        navigate("/")
        window.location.reload(false)
      }, 1000)
    } else {
      alert("Carico annullato")
    }
  }

  //^^^^^^^^^^^^^^^^^//
  // END FASE CARICO //
  //_________________//

  /************************/
  /************************/
  /** START FASE SCARICO **/
  /************************/
  /************************/

  //--- GET NUMERO CARICHI (stato false) IN UN CASSONE COPIA
  useEffect(() => {
    Array.isArray(cassone.carico) &&
      setCheckedStateCarico(new Array(cassone.carico.length).fill(false))
  }, [cassone])

  //--- TOGGLE CARICHI (stato true/false) NEL CASSONE COPIA
  const handleCheckbox = (position) => {
    setCheckedStateCarico(
      checkedStateCarico.map((item, i) => (position === i ? !item : item))
    )
  }

  //--- SOSTITUISCI CARICO ORIGINALI CON COPIA CASSONE
  const updateCheckeState = async (id) => {
    setIsLoading(true)
    checkedStateCarico.map((item, i) =>
      item === true ? (cassone.carico[i].stato = true) : item
    )
    let cassoneScaricato = cassone.carico.filter((item) => item.stato === false)
    const cassoneRef = doc(db, "fir", id)
    await updateDoc(cassoneRef, {
      carico: cassoneScaricato,
    })
    setIsLoading(false)
  }

  //1.--- UPDATE SCARICO NEL CASSONE
  //2.--- UPDATE NUMERO PROGRESSIVO
  //3.---TODO: UPDATE LOG

  const updateCassoneScarico = async (id) => {
    if (window.confirm(`Premi OK per confermare lo scarico`)) {
      updateCheckeState(id)
      updateNumeroProgressivo()
      setTimeout(() => {
        navigate("/")
        window.location.reload(false)
      }, 1000)
    } else {
      alert("Scarico annullato")
    }
  }

  //^^^^^^^^^^^^^^^^^^//
  // END FASE SCARICO //
  //__________________//

  //--- RENDER
  return (
    <ContextData.Provider
      value={{
        today,
        year,
        cassone,
        cassoni,
        mcInputCarico,
        rifProgressivo,
        getCassoneSelezionato,
        setMcInputCarico,
        updateCassoneCarico,
        updateCassoneScarico,
        handleCheckbox,
        isLoading,
      }}
    >
      {props.children}
    </ContextData.Provider>
  )
}
