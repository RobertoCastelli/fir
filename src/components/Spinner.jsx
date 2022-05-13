import React from "react";

export const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <div>
        Sto elaborando la richiesta...
        <span role="img" aria-labelledby="sleep">
          😴
        </span>
      </div>
    </div>
  );
};
