import React, { useContext } from "react";
// COMPONENTS
import { Content } from "./Content";
// CONTEXT
import { ContextData } from "../context";

export const Log = () => {
  const { logs } = useContext(ContextData);

  return (
    <>
      {logs.length !== 0 ? (
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
