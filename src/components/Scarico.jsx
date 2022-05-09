import React, { useContext } from "react"
// COMPONENTS
import { Content } from "./Content"
import { ElencoCarichi } from "./ElencoCarichi"
import { Spinner } from "./Spinner"
// ICONS
import { BsMinecartLoaded } from "react-icons/bs"
import { FiUpload } from "react-icons/fi"
// CONTEXT
import { ContextData } from "../context"

export const Scarico = () => {
  const {
    cassone,
    rifProgressivo,
    updateCassoneScarico,
    isLoading,
  } = useContext(ContextData)

  return (
    <>
      {(() => {
        if (cassone.length !== 0) {
          return (
            <div className="wrapper-scarico" style={{ color: cassone.colore }}>
              <div className="title-scarico">SCARICO</div>
              <div className="cer-scarico">CER {cassone.cer}</div>
              <div className="descrizione-scarico">{cassone.descrizione}</div>
              <div className="rif-scarico">Rif. {rifProgressivo}/2022</div>
              <div className="mc-scarico">
                {cassone.mcTotali} / 36 <BsMinecartLoaded />
              </div>
              <div className="filtered-scarico">
                <ElencoCarichi />
              </div>
              <button
                className="carico-scarico"
                onClick={() => updateCassoneScarico(cassone.id)}
              >
                <FiUpload size={20} />
              </button>
            </div>
          )
        } else if (isLoading) {
          return <Spinner />
        } else {
          return <Content />
        }
      })()}
    </>
  )
}
