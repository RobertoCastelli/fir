import React, { useState, useEffect } from "react"

//--- FIREBASE
import { db } from "./firebase"
import { doc, getDocs, getDoc, updateDoc, collection } from "firebase/firestore"
//--- CONTEXT
export const ContextData = React.createContext()

export const ContextProvider = (props) => {
  //--- STATES
  const [cassoni, setCassoni] = useState([])
  const [cassone, setCassone] = useState([])
  const [rifProgressivo, setRifProgressivo] = useState(0)
  const [mcInputCarico, setMcInputCarico] = useState(0)
  /*   const [logs, setLogs] = useState([]) */
  /*   const [filteredState, setFilteredState] = useState([]) */

  //--- GET DATE && YEAR
  const today = new Date().toLocaleDateString().slice(0, 4)
  const year = new Date()
    .getFullYear()
    .toString()
    .slice(-2)

  //--- GET NUMERO PROGRESSIVO
  useEffect(() => {
    const getNumeroProgressivo = async () => {
      const progressivoSnapshot = await getDocs(collection(db, "contatore"))
      progressivoSnapshot.docs.map((doc) => setRifProgressivo(doc.data().prog))
    }
    return () => getNumeroProgressivo()
  }, [])
  //--- GET CASSONI LIST
  useEffect(() => {
    const getCassoni = async () => {
      const cassoniSnapshot = await getDocs(collection(db, "fir"))
      const cassoniList = cassoniSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setCassoni(cassoniList)
    }
    return () => getCassoni()
  }, [])
  console.log(cassoni)

  //--- GET CASSONE SELEZIONATO
  const getCassoneSelezionato = async (id) => {
    const cassoneSnapshot = await getDoc(doc(db, "fir", id))
    if (cassoneSnapshot.exists()) {
      return setCassone({ ...cassoneSnapshot.data(), id: id })
    } else {
      console.log("Cassone non presente nel Database")
    }
  }

  //--- UPDATE CASSONE SELEZIONATE
  const updateCassone = async (id) => {
    const cassoneSnapshot = doc(db, "fir", id)
    await updateDoc(cassoneSnapshot, {
      carico: [
        ...cassoneSnapshot.carico,
        {
          rif: rifProgressivo,
          mc: mcInputCarico,
          stato: false,
        },
      ],
    })
  }

  // INCREMENTA RIF. PROGRESSIVO CARICO/SCARICO
  /*   const incrementaRifProgressivo = () => setRifProgressivo(rifProgressivo + 1) */

  // PRENDI CASSONE SELEZIONATO
  /* const showSelectedCer = (cer) => {
    setSelectedCer(Cassoni.filter((c) => c.cer === cer))
    return getFilteredStateCarico(cer)
  }*/

  /*   // SOMMA MC-TOTALI DEI CARICHI DEL CASSONE
  const sommaCarichi = (cer) => {
    let arr = [mcInputCarico]
    Cassoni.map((c) => {
      if (c.cer === cer) {
        return c.carico.forEach((e) => e.stato === false && arr.push(e.mc))
      } else {
        return c
      }
    })
    return arr.reduce((a, b) => parseInt(a) + parseInt(b), 0)
  }

  // AGGIORNA MC-TOTALI NEL CASSONE SELEZIONATO
  const updateMcTotaliSelectedCer = (cer) =>
    setSelectedCer([{ ...selectedCer[0], mcTotali: sommaCarichi(cer) }])

  /***********************/
  /***********************/
  /** START FASE CARICO **/
  /***********************/
  /***********************/

  // AGGIORNA CARICO ==> MC, MC-TOTALI, RIF. PROGRESSIVO E STATO NEI CASSONI
  /* const updateDataSelectedCerCarico = (cer) => {
    setCassoni(
      Cassoni.map((c) => {
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
          }
        } else {
          return c
        }
      })
    )
  }*/

  // AGGIORNA LOG CARICO
  /* const updateLogCarico = (cer) => {
    setLogs([
      ...logs,
      {
        today,
        cer,
        year,
        rifProgressivo,
        mcInputCarico,
      },
    ])
  }*/

  // AGGIORNA TUTTI I DATI DEL CARICO
  /*const updateCersCarico = (cer) => {
    if (
      mcInputCarico !== 0 &&
      window.confirm(
        `⚠️ CARICO CER ${selectedCer[0].cer} - rif.${rifProgressivo}/${year} ➟ ${mcInputCarico} mc?`
      )
    ) {
      updateDataSelectedCerCarico(cer)
      updateLogCarico(cer)
      updateMcTotaliSelectedCer(cer)
      incrementaRifProgressivo()
      setMcInputCarico(0)
    } else {
      alert("❌ Carico annullato!")
    }
  } */
  /*^^^^^^^^^^^^^^^^^^^*/
  /** END FASE CARICO **/
  /*___________________*/

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
        cassoni,
        cassone,
        getCassoneSelezionato,
        rifProgressivo,
        mcInputCarico,
        setMcInputCarico,
        updateCassone,
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
