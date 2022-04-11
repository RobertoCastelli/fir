import React from "react"
// ROUTER
import { Link } from "react-router-dom"
// ICONS
import { AiOutlineHome } from "react-icons/ai"
import { ImListNumbered } from "react-icons/im"

export const Title = () => {
  return (
    <div className="wrapper-title">
      <h1 className="title-title">F.I.R.</h1>
      <div className="second-title">
        GESTIONE CARICO E SCARICO MATERIALE DI RISULTA
      </div>
      <Link to="/log">
        <button className="info-title">
          <ImListNumbered size={20} />
        </button>
      </Link>
      <Link to="/">
        <button className="home-title">
          <AiOutlineHome size={20} />
        </button>
      </Link>
    </div>
  )
}
