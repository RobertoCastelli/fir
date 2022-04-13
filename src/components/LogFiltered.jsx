import React, { useContext } from "react";
// CONTEXT
import { ContextData } from "../context";

export const LogFiltered = () => {
  const { filteredLogs } = useContext(ContextData);
  return (
    <ul className="ul-filtered">
      {filteredLogs.map((log, i) => {
        return (
          <li key={i} className="li-filtered">
            rif. {log.rifProgressivo} ➟ {log.mcCarico} mc
          </li>
        );
      })}
    </ul>
  );
};
