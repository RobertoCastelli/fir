import React, { useContext } from "react";
// ROUTER
import { Link } from "react-router-dom";
// ICONS
import { BsMinecartLoaded } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { FiDownload, FiInfo } from "react-icons/fi";
// CONTEXT
import { ContextData } from "../context";

export const Carico = () => {
  const { caricoMateriale, selectedCer, setMcCarico, rifProgressivo } =
    useContext(ContextData);

  return (
    <div className="wrapper-carico" style={{ color: selectedCer[0].colore }}>
      <div className="title-carico">CARICO</div>
      <div className="cer-carico">CER {selectedCer[0].cer}</div>
      <div className="descrizione-carico">{selectedCer[0].descrizione}</div>
      <div className="rif-carico">Rif. {rifProgressivo}/2022</div>
      <div className="mc-carico">
        {selectedCer[0].mc} / 36 <BsMinecartLoaded />
      </div>
      <input
        onChange={(e) => setMcCarico(e.target.value)}
        className="input-carico"
        type="number"
        name="mc"
        placeholder="inserisci mc"
      />
      <button
        className="carico-carico"
        onClick={() => caricoMateriale(selectedCer[0].cer)}
      >
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
