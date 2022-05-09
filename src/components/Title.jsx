import React, { useContext } from "react"
// ROUTER
import { Link } from "react-router-dom"
// ICONS
import { AiOutlineHome } from "react-icons/ai"
import { ImListNumbered } from "react-icons/im"
// IMAGES
import bg from "../images/camion.png"
// CONTEXT
import { ContextData } from "../context"

export const Title = () => {
  const { rifProgressivo, year, getLogs } = useContext(ContextData)
  return (
    <div className="wrapper-title">
      <img className="img-title" src={bg} alt="bg-img" />
      <div className="second-title">
        <h1 className="title-title">F.I.R. </h1>
        <div>GESTIONE CARICO E SCARICO MATERIALE DI RISULTA</div>
        <div className="rif-title">
          rif. {rifProgressivo} /{year}
        </div>
      </div>
      <Link to="/logs">
        <button className="info-title" onClick={() => getLogs()}>
          <ImListNumbered size={30} />
        </button>
      </Link>
      <Link to="/">
        <button className="home-title">
          <AiOutlineHome size={30} />
        </button>
      </Link>
    </div>
  )
}
