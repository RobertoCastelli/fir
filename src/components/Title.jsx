import React, { useContext } from "react"
// ROUTER
import { Link } from "react-router-dom"
// ICONS
import { AiOutlineHome } from "react-icons/ai"
import { ImListNumbered } from "react-icons/im"
// IMAGES
/* import bg from "../images/header-img.jpg" */
// CONTEXT
import { ContextData } from "../context"

export const Title = () => {
  const { rifProgressivo, year, getLogs } = useContext(ContextData)
  return (
    <div className="wrapper-title">
      {/*       <img className="img-title" src={bg} alt="bg-img" /> */}
      <h1 className="title-title">F.I.R. </h1>
      <div className="">GESTIONE CARICO E SCARICO RIFIUTI</div>
      <div className="rif-title">
        rif. {rifProgressivo} /{year}
      </div>
      <Link to="/logs">
        <button className="btn-info-title" onClick={() => getLogs()}>
          <ImListNumbered size={30} />
        </button>
      </Link>
      <Link to="/">
        <button className="btn-home-title">
          <AiOutlineHome size={30} />
        </button>
      </Link>
    </div>
  )
}
