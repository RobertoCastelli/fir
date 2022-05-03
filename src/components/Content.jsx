import React, { useContext } from "react"
// ROUTER
import { Link } from "react-router-dom"
// ICONS
import { FaRecycle } from "react-icons/fa"
import { FiDownload, FiUpload } from "react-icons/fi"
import { BsMinecartLoaded } from "react-icons/bs"
// CONTEXT
import { ContextData } from "../context"

export const Content = () => {
  const { cassoni, getCassoneSelezionato } = useContext(ContextData)

  return (
    <div className="wrapper-content">
      <ul className="ul-content">
        {cassoni.map((cassone) => {
          return (
            <li
              className="li-content"
              key={cassone.id}
              style={{ color: cassone.colore }}
            >
              <div className="img-content">
                <FaRecycle size={50} />
              </div>
              <div className="cassone-content">CER {cassone.cer}</div>
              <div className="descrizione-content">{cassone.descrizione}</div>
              <div className="mc-content">
                {cassone.mcTotali} / 36 <BsMinecartLoaded />
              </div>
              <Link to="/carico">
                <button
                  className="btn-carico-content"
                  onClick={() => getCassoneSelezionato(cassone.id)}
                >
                  <FiDownload size={20} />
                </button>
              </Link>
              <Link to="/scarico">
                <button
                  className="btn-scarico-content"
                  onClick={() => getCassoneSelezionato(cassone.id)}
                >
                  <FiUpload size={20} />
                </button>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
