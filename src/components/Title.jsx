import React from "react";
import logo from "../images/logo-itaf.png";

export const Title = () => {
  return (
    <div className="wrapper-title">
      <div className="content-title">
        <h1>F.I.R.</h1>
        <img className="logo-title" src={logo} alt="logo" />
      </div>
      <div className="second-title">
        GESTIONE CARICO E SCARICO MATERIALE DI RISULTA
      </div>
    </div>
  );
};
