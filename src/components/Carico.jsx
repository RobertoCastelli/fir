import React, { useContext } from "react";
// COMPONENTS
import { Content } from "./Content";
// ICONS
import { BsMinecartLoaded } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
// CONTEXT
import { ContextData } from "../context";

export const Carico = () => {
  const {
    selectedCer,
    mcInputCarico,
    setMcInputCarico,
    rifProgressivo,
    updateMcSelectedCer,
  } = useContext(ContextData);

  return (
    <>
      {selectedCer[0] ? (
        <div
          className="wrapper-carico"
          style={{ color: selectedCer[0].colore }}
        >
          <div className="title-carico">CARICO</div>
          <div className="cer-carico">CER {selectedCer[0].cer}</div>
          <div className="descrizione-carico">{selectedCer[0].descrizione}</div>
          <div className="rif-carico">Rif. {rifProgressivo}/2022</div>
          <div className="mc-carico">
            {selectedCer[0].mcTotali} / 36 <BsMinecartLoaded />
          </div>
          <div className="wrapper-input-carico">
            <input
              className="input-carico"
              name="mc"
              type="number"
              value={mcInputCarico}
              onChange={(e) => setMcInputCarico(e.target.value)}
              onFocus={(e) => (e.target.value = "")}
            />
            <label htmlFor="mc"> mc</label>
          </div>
          <button
            className="btn-carico-carico"
            onClick={() => updateMcSelectedCer(selectedCer[0].cer)}
          >
            <FiDownload size={20} />
          </button>
        </div>
      ) : (
        <Content />
      )}
    </>
  );
};
