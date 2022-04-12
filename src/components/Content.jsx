import React, { useContext } from "react";
// ROUTER
import { Link } from "react-router-dom";
// ICONS
import { FaRecycle } from "react-icons/fa";
import { FiDownload, FiUpload } from "react-icons/fi";
import { BsMinecartLoaded } from "react-icons/bs";
// CONTEXT
import { ContextData } from "../context";

export const Content = () => {
  const { cersDb, getCerCarico } = useContext(ContextData);

  return (
    <div className="wrapper-content">
      <ul className="ul-content">
        {cersDb.map((cer) => {
          return (
            <li
              key={cer.cer}
              className="li-content"
              style={{ color: cer.colore }}
            >
              <div className="img-content">
                <FaRecycle size={50} />
              </div>
              <div className="cer-content">CER {cer.cer}</div>
              <div className="descrizione-content">{cer.descrizione}</div>
              <div className="mc-content">
                {cer.mc} / 36 <BsMinecartLoaded />
              </div>
              <Link to="/carico">
                <button
                  onClick={() => getCerCarico(cer.cer)}
                  className="carico-content"
                >
                  <FiDownload size={20} />
                </button>
              </Link>
              <Link to="/scarico">
                <button className="scarico-content">
                  <FiUpload size={20} />
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
