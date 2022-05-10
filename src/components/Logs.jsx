import React, { useContext } from "react"
// COMPONENTS
import { Content } from "./Content"
// CONTEXT
import { ContextData } from "../context"

export const Logs = () => {
  const { logs, year } = useContext(ContextData)

  return (
    <>
      {logs.length !== 0 ? (
        <div className="wrapper-log">
          <ul className="ul-log">
            {logs.map((log, i) => {
              return log.stato === "caricato" ? (
                <li key={i} className="li-container-log">
                  <div className="li-rif-carico-log">rif.{log.rif}</div>
                  <div className="li-details-log">
                    {log.createdAt}
                    {year} - {log.cer} ➞ {log.mc}mc
                  </div>
                </li>
              ) : (
                <li key={i} className="li-container-log">
                  <div className="li-rif-scarico-log">rif.{log.rif}</div>
                  <div className="li-details-log">
                    {log.createdAt}
                    {year} - {log.cer}{" "}
                    {log.scarico.map((item, i) => {
                      return (
                        <div key={i}>
                          rif. {item.rif} ➞ {item.mc}mc
                        </div>
                      )
                    })}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <Content />
      )}
    </>
  )
}
