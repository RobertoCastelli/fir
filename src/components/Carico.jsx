import React from "react";
// ROUTER
import { Link } from "react-router-dom";
// ICONS
import { BsMinecartLoaded } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { FiDownload, FiInfo } from "react-icons/fi";

export const Carico = () => {
  return (
    <div className="wrapper-carico">
      <div className="title-carico">CARICO</div>
      <div className="cer-carico">CER 123456</div>
      <div className="descrizione-carico">descrizione</div>
      <div className="rif-carico">Rif. 00/2022</div>
      <div className="mc-carico">
        20 / 36 <BsMinecartLoaded />
      </div>
      <input
        className="input-carico"
        type="number"
        name="mc"
        placeholder="inserisci mc"
      />
      <button className="carico-carico">
        <FiDownload size={20} />
      </button>
      <button className="info-carico">
        <FiInfo size={20} />
      </button>
      <Link to="/">
        <button className="home-carico">
          <AiOutlineHome size={20} />
        </button>
      </Link>
    </div>
  );
};
