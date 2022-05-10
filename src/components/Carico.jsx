import React, { useContext } from "react"
// COMPONENTS
import { Spinner } from "./Spinner"
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
    updateCassoneCarico,
    isLoading,
  } = useContext(ContextData)

  return (
    <>
      {(() => {
        if (cassone.length !== 0) {
          return (
            <div className="wrapper-carico">
              <div className="background-carico">
                <div
                  className="title-carico"
                  style={{ backgroundColor: cassone.colore }}
                >
                  CARICO
                </div>
              </div>
              <div className="text-carico">
                <div className="cer-carico">CER {cassone.cer}</div>
                <div className="descrizione-carico">{cassone.descrizione}</div>
                <div className="rif-carico">
                  Rif. {rifProgressivo}/{year}
                </div>
                <div className="mc-carico">
                  {cassone.mcTotali} / 36 <BsMinecartLoaded />
                </div>
              </div>
              <div className="btns-carico">
                {" "}
                <label htmlFor="mc">
                  <input
                    required
                    className="input-carico"
                    min="0"
                    type="number"
                    name="mc"
                    value={mcInputCarico}
                    onFocus={(e) => (e.target.value = "")}
                    onChange={(e) =>
                      e.target.value < 0
                        ? setMcInputCarico(parseInt(e.target.value * -1))
                        : setMcInputCarico(parseInt(e.target.value))
                    }
                  />{" "}
                  mc
                </label>
                <button
                  className="btn-carico-carico"
                  onClick={() => updateCassoneCarico(cassone.id)}
                >
                  <FiDownload size={20} />
                </button>
              </div>
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
