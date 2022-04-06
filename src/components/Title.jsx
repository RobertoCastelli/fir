import React, { useContext } from "react";
import { ContextData } from "../context";

export const Title = () => {
  const { today } = useContext(ContextData);

  return (
    <div className="wrapper-title">
      <h1 className="title-title">F.I.R.</h1>
      <div className="second-title">
        GESTIONE CARICO E SCARICO MATERIALE DI RISULTA
      </div>
    </div>
  );
};
