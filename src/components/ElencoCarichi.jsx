import React, { useContext } from "react"
// CONTEXT
import { ContextData } from "../context"

export const ElencoCarichi = () => {
  const { year, cassone, handleCheckbox } = useContext(ContextData)
  return (
    <>
      {cassone.carico.length !== 0 ? (
        <div className="wrapper-elenco">
          <ul className="ul-elenco">
            {cassone.carico.map((elem, i) => {
              return (
                <li key={i} className="li-elenco">
                  <input
                    type="checkbox"
                    name="rifCarico"
                    id={elem.rif / year}
                    value={elem.mc}
                    onChange={() => handleCheckbox(i)}
                  />
                  rif.{elem.rif}/{year} {elem.mc}mc
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div className="nessun-carico-elenco">0 carichi</div>
      )}
    </>
  )
}
