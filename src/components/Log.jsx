import React, { useContext } from "react"
// CONTEXT
import { ContextData } from "../context"

export const Log = () => {
  const { logs } = useContext(ContextData)

  return (
    <div className="wrapper-log">
      <ol className="ol-log">
        {logs.map((log, i) => {
          return (
            <li key={i}>
              <div>
                {log.today} - CER {log.cer} {log.descrizione}
              </div>
              <div>CARICO ➟ {log.carico} mc</div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
