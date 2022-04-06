import React from "react";
import { Link } from "react-router-dom";
import { cers } from "../variables/cers";

export const Content = () => {
  return (
    <div className="wrapper-content">
      <ul className="ul-content">
        {cers.map((cer) => {
          return (
            <li key={cer.cer} className="li-content">
              <img
                className="img-content"
                src="http://via.placeholder.com/100"
                alt="img"
              />
              <div className="cer-content">CER {cer.cer}</div>
              <div className="descrizione-content">{cer.descrizione}</div>
              <div className="mc-content">mc {cer.mc}/ 36</div>
              <button className="carico-content">
                <Link to="/carico">C</Link>
              </button>
              <button className="scarico-content">
                <Link to="/scarico">S</Link>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
