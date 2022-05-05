import React, { useContext } from "react"
// COMPONENTS
import { Content } from "./Content"
// ICONS
import { BsMinecartLoaded } from "react-icons/bs"
import { FiDownload } from "react-icons/fi"
// CONTEXT
import { ContextData } from "../context"

export const Carico = () => {
  const {
    year,
    cassone,
    rifProgressivo,
    mcInputCarico,
    setMcInputCarico,
    updateCassone,
  } = useContext(ContextData)

  return (
    <>
      {cassone.cer ? (
        <div className="wrapper-carico" style={{ color: cassone.colore }}>
          <div className="title-carico">CARICO</div>
          <div className="cer-carico">CER {cassone.cer}</div>
          <div className="descrizione-carico">{cassone.descrizione}</div>
          <div className="rif-carico">
            Rif. {rifProgressivo}/{year}
          </div>
          <div className="mc-carico">
            {cassone.mcTotali} / 36 <BsMinecartLoaded />
          </div>
          <div className="wrapper-input-carico">
            <input
              required
              className="input-carico"
              min="0"
              name="mc"
              type="number"
              value={mcInputCarico}
              onChange={(e) =>
                e.target.value < 0
                  ? setMcInputCarico(parseInt(e.target.value * -1))
                  : setMcInputCarico(parseInt(e.target.value))
              }
              onFocus={(e) => (e.target.value = "")}
            />
            <label htmlFor="mc"> mc</label>
          </div>

          <button
            className="btn-carico-carico"
            onClick={() => updateCassone(cassone.id)}
          >
            <FiDownload size={20} />
          </button>
        </div>
      ) : (
        <Content />
      )}
    </>
  )
}
