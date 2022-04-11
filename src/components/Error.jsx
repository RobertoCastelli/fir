import React from "react"

export const Error = () => {
  return (
    <div className="wrapper-error">
      <h1>ERROR 404</h1>
      <h3>the requested URL " {window.location.href} " was not found</h3>
    </div>
  )
}
