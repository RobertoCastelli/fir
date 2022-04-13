import React, { useContext } from "react";
// CONTEXT
import { ContextData } from "../context";
import { Content } from "./Content";

export const Log = () => {
  const { logs, selectedCer } = useContext(ContextData);

  return (
    <>
      {selectedCer[0] ? (
        <div className="wrapper-log">
          <ul className="ol-log">
            {logs.map((log, i) => {
              return (
                <li key={i} className="li-log">
                  rif.{log.rifProgressivo} [{log.attivita}] {log.today} - CER{" "}
                  {log.cer} ➟ {log.mcCarico} mc
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <Content />
      )}
    </>
  );
};
