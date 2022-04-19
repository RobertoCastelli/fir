import React, { useContext } from "react";
// CONTEXT
import { ContextData } from "../context";

export const FilteredStateCarico = () => {
  const { filteredState } = useContext(ContextData);
  return (
    <div className="wrapper-filtered">
      <ul className="ul-filtered">
        {filteredState.map((log, i) => {
          return (
            <li key={i} className="li-filtered">
              <input type="checkbox" name="rifCarico" id="rifCarico" />
              rif.{log.rif} ➟ {log.mc}mc
            </li>
          );
        })}
      </ul>
    </div>
  );
};
