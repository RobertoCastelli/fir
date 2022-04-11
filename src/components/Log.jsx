import React, { useContext } from "react"
// CONTEXT
import { ContextData } from "../context"
import { Content } from "./Content"

export const Log = () => {
  const { logs, selectedCer } = useContext(ContextData)

  return (
    <>
      {selectedCer[0] ? (
        <div className="wrapper-log">
          <ol className="ol-log">
            {logs.map((log, i) => {
              return (
                <li key={i}>
                  <div>
                    {log.today} - CER {log.cer}
                  </div>
                  <div>CARICO ➟ {log.carico} mc</div>
                </li>
              )
            })}
          </ol>
        </div>
      ) : (
        <Content />
      )}
    </>
  )
}
