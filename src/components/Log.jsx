import React, { useContext } from "react"
// CONTEXT
import { ContextData } from "../context"

export const Log = () => {
  const { log } = useContext(ContextData)

  return (
    <div>
      <ol>
        {log.map((l, i) => {
          return <li key={i}>{l}</li>
        })}
      </ol>
    </div>
  )
}
