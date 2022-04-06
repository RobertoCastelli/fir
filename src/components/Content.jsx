import React from "react";
import { Link } from "react-router-dom";
import { cers } from "../variables/cers";
// ICONS
import { FaRecycle } from "react-icons/fa";
import { FiDownload, FiUpload, FiInfo } from "react-icons/fi";

export const Content = () => {
  return (
    <div className="wrapper-content">
      <ul className="ul-content">
        {cers.map((cer) => {
          return (
            <li key={cer.cer} className="li-content">
              <div className="img-content" style={{ color: cer.colore }}>
                <FaRecycle size={50} />
              </div>
              <div className="cer-content">CER {cer.cer}</div>
              <div className="descrizione-content">{cer.descrizione}</div>
              <div className="mc-content">mc {cer.mc}/ 36</div>
              <Link to="/carico">
                <button className="carico-content">
                  <FiUpload size={30} />
                </button>
              </Link>
              <Link to="/scarico">
                <button className="scarico-content">
                  <FiDownload size={30} />
                </button>
              </Link>
              <button className="info-content">
                <FiInfo size={30} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
