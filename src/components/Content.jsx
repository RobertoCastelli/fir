import React from "react";
import { Link } from "react-router-dom";
import { cers } from "../variables/cers";

export const Content = () => {
  return (
    <div>
      <ul>
        {cers.map((cer) => {
          return (
            <li>
              <div>CER {cer.cer}</div>
              <div>{cer.descrizione}</div>
              <div>mc {cer.mc}/ 36</div>
              <div>
                <button>
                  <Link to="/carico">C</Link>
                </button>
                <button>
                  <Link to="/scarico">S</Link>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
