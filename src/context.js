import React, { useState, useEffect } from "react"
//--- NAVIGATE
import { useNavigate } from "react-router-dom"
//--- FIREBASE
import { db } from "./firebase"
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  increment,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore"

//--- CONTEXT
export const ContextData = React.createContext()

export const ContextProvider = (props) => {
  /*   
  \ \ / / _` | '__/ __|
   \ V / (_| | |  \__ \
    \_/ \__,_|_|  |___/ */

  //--- STATES VARIABLES
  const [cassoni, setCassoni] = useState([])
  const [cassone, setCassone] = useState([])
  const [mcInputCarico, setMcInputCarico] = useState(0)
  const [rifProgressivo, setRifProgressivo] = useState(0)
  const [checkedStateCarico, setCheckedStateCarico] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [logs, setLogs] = useState([])

  //--- FIREBASE VARIABLES
  const docRefContatore = doc(db, "contatore", "KZHr4753xMnqTy0H3rBI")
  const collRefLogs = collection(db, "logs")
  const collRefFir = collection(db, "fir")

  //--- NAVIGATE VARIABLE
  const navigate = useNavigate()

  //--- GET DATE && YEAR VARIABLES
  const today = new Date().toLocaleDateString().slice(0, 4)
  const year = new Date()
    .getFullYear()
    .toString()
    .slice(-2)

  /*
   _ __  _   _ _ __ ___    _ __  _ __ ___   __ _ 
  | '_ \| | | | '_ ` _ \  | '_ \| '__/ _ \ / _` |
  | | | | |_| | | | | | | | |_) | | | (_) | (_| |
  |_| |_|\__,_|_| |_| |_| | .__/|_|  \___/ \__, |
                          |_|              |___/   */

  //--- SHOW NUMERO PROGRESSIVO
  onSnapshot(docRefContatore, (doc) => setRifProgressivo(doc.data().prog))

  //--- UPDATE NUMERO PROGRESSIVO + 1
  const updateNumeroProgressivo = async () => {
    await updateDoc(docRefContatore, {
      prog: increment(1),
    })
  }

  /*                  
  | | ___   __ _ ___ 
  | |/ _ \ / _` / __|
  | | (_) | (_| \__ \
  |_|\___/ \__, |___/
          |___/      */

  //--- SHOW LOGS
  const getLogs = async () => {
    const q = query(collection(db, "logs"), orderBy("timestamp"))
    const logsSnapshot = await getDocs(q)
    const logsList = logsSnapshot.docs.map((doc) => doc.data())
    setLogs(logsList)
  }

  //--- ADD LOG CARICO
  const addLogCarico = async () => {
    await addDoc(collRefLogs, {
      timestamp: serverTimestamp(),
      createdAt: today,
      cer: cassone.cer,
      rif: rifProgressivo,
      mc: mcInputCarico,
      stato: "caricato",
    })
  }

  //--- ADD LOG SCARICO
  const addLogScarico = async () => {
    await addDoc(collRefLogs, {
      timestamp: serverTimestamp(),
      createdAt: today,
      cer: cassone.cer,
      rif: rifProgressivo,
      stato: "scaricato",
      scarico: cassone.carico.filter((item) => item.stato === true),
    })
  }

  /*                           
   ___ __ _ _ __(_) ___ ___  
  / __/ _` | '__| |/ __/ _ \ 
 | (_| (_| | |  | | (_| (_) |
  \___\__,_|_|  |_|\___\___/   */

  //--- SHOW TUTTI I CASSONI
  useEffect(() => {
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
  }, [rifProgressivo])

  //--- SHOW CASSONE SELEZIONATO
  const getCassoneSelezionato = async (id) => {
    // spinner on
    setIsLoading(true)
    const cassoneSnapshot = await getDoc(doc(db, "fir", id))
    if (cassoneSnapshot.exists()) {
      setCassone({
        ...cassoneSnapshot.data(),
        id: id,
        mcTotali: sommaCarichiNelCassone(id),
      })
      // spinner off
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
    // spinner on
    setIsLoading(true)
    const cassoneRef = doc(db, "fir", id)
    await updateDoc(cassoneRef, {
      carico: [
        ...cassone.carico,
        { rif: rifProgressivo, mc: mcInputCarico, stato: false },
      ],
    })
    // spinner off
    setIsLoading(false)
  }

  //--- FASI DI CARICO
  const updateCassoneCarico = (id) => {
    if (
      mcInputCarico !== 0 &&
      window.confirm(
        `Premi OK per confermare carico ${mcInputCarico} mc ➞ rif. ${rifProgressivo}`
      )
    ) {
      //1.--- UPDATE CASSONE SELEZIONATO
      updateRifMcStateCassone(id)
      //2.--- UPDATE NUMERO PROGRESSIVO
      updateNumeroProgressivo()
      //3.--- RESET MC INPUT
      setMcInputCarico(0)
      //4.--- UPDATE LOG CARICO
      addLogCarico()
      //5.--- NAVIGATE TO HOMEPAGE
      navigate("/")
    } else {
      alert("Carico annullato")
    }
  }

  /*
   ___  ___ __ _ _ __(_) ___ ___  
  / __|/ __/ _` | '__| |/ __/ _ \ 
  \__ \ (_| (_| | |  | | (_| (_) |
  |___/\___\__,_|_|  |_|\___\___/  */

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
    // spinner on
    setIsLoading(true)
    // cambia stato true/false cassone originale
    checkedStateCarico.map((item, i) =>
      item === true ? (cassone.carico[i].stato = true) : item
    )
    // filtra i carichi non scaricati
    let cassoneScaricato = cassone.carico.filter((item) => item.stato === false)
    // aggiorna cassone con i carichi rimanenti
    const cassoneRef = doc(db, "fir", id)
    await updateDoc(cassoneRef, {
      carico: cassoneScaricato,
    })
    // spinner off
    setIsLoading(false)
  }

  //--- FASI DI SCARICO
  const updateCassoneScarico = async (id) => {
    if (
      cassone.carico.length !== 0 &&
      window.confirm(`Premi OK per confermare lo scarico`)
    ) {
      //1.--- UPDATE SCARICO NEL CASSONE
      updateCheckeState(id)
      //2.--- UPDATE NUMERO PROGRESSIVO
      updateNumeroProgressivo()
      //3.---UPDATE LOG SCARICO
      addLogScarico()
      //4.--- NAVIGATE TO HOMEPAGE
      navigate("/")
    } else {
      alert("Scarico annullato")
    }
  }

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
        logs,
        getLogs,
      }}
    >
      {props.children}
    </ContextData.Provider>
  )
}
