import React, { useContext } from "react"
import { Content } from "./Content"

// ICONS
import { BsMinecartLoaded } from "react-icons/bs"
import { FiUpload } from "react-icons/fi"
// CONTEXT
import { ContextData } from "../context"

export const Scarico = () => {
  const {
    scaricoMateriale,
    selectedCer,
    mcCarico,
    setMcCarico,
    rifProgressivo,
  } = useContext(ContextData)

  return (
    <>
      {selectedCer[0] ? (
        <div
          className="wrapper-scarico"
          style={{ color: selectedCer[0].colore }}
        >
          <div className="title-scarico">SCARICO</div>
          <div className="cer-scarico">CER {selectedCer[0].cer}</div>
          <div className="descrizione-scarico">
            {selectedCer[0].descrizione}
          </div>
          <div className="rif-scarico">Rif. {rifProgressivo}/2022</div>
          <div className="mc-scarico">
            {selectedCer[0].mc} / 36 <BsMinecartLoaded />
          </div>
          <div className="wrapper-input-scarico">
            <input
              className="input-scarico"
              name="mc"
              type="number"
              value={mcCarico}
              onChange={(e) => setMcCarico(e.target.value)}
              onFocus={(e) => (e.target.value = "")}
            />
            <label htmlFor="mc"> mc</label>
          </div>
          <button
            className="carico-scarico"
            onClick={() => scaricoMateriale(selectedCer[0].cer)}
          >
            <FiUpload size={20} />
          </button>
        </div>
      ) : (
        <Content />
      )}
    </>
  )
}
