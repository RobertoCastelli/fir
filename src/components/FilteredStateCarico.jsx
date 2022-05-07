import React, { useContext } from "react"
// CONTEXT
import { ContextData } from "../context"

export const FilteredStateCarico = () => {
  const { year, elencoCarichi, handleChange } = useContext(ContextData)
  return (
    <div className="wrapper-filtered">
      <ul className="ul-filtered">
        {elencoCarichi.map((elem, i) => {
          return (
            <li key={i} className="li-filtered">
              <input
                type="checkbox"
                name="rifCarico"
                id={elem.rif / year}
                value={elem.mc}
                onChange={() => handleChange(i)}
              />
              rif.{elem.rif}/{year} {elem.mc}mc
            </li>
          )
        })}
      </ul>
    </div>
  )
}
