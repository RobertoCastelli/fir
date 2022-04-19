import React, { useContext } from "react"
// COMPONENTS
import { Content } from "./Content"
import { FilteredStateCarico } from "./FilteredStateCarico"
// ICONS
import { BsMinecartLoaded } from "react-icons/bs"
import { FiUpload } from "react-icons/fi"
// CONTEXT
import { ContextData } from "../context"

export const Scarico = () => {
  const { selectedCer, rifProgressivo, updateCersScarico } = useContext(
    ContextData
  )

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
            {selectedCer[0].mcTotali} / 36 <BsMinecartLoaded />
          </div>
          <div className="filtered-scarico">
            <FilteredStateCarico />
          </div>
          <button
            className="carico-scarico"
            onClick={() => updateCersScarico(selectedCer[0].cer)}
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
