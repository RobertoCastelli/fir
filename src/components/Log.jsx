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
          <ul className="ul-log">
            {logs.map((log, i) => {
              return (
                <li key={i} className="li-log">
                  <div className="li-rif">
                    {log.rifProgressivo}/{log.year}
                  </div>
                  <div className="li-details">
                    {log.today} {log.stato} - CER {log.cer} ➟{" "}
                    {log.mcInputCarico} mc
                  </div>
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
