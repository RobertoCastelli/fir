import React from "react";
import { Link } from "react-router-dom";

export const Carico = () => {
  return (
    <div>
      <div>CARICO</div>
      <div>CER 123456</div>
      <div>Rif. n</div>
      <div>TOTALE mc 20/36</div>
      <form>
        <label htmlFor="mc">mc </label>
        <input type="number" name="mc" />
        <button>CARICA</button>
      </form>
      <button>
        <Link to="/">HOME</Link>
      </button>
    </div>
  );
};
