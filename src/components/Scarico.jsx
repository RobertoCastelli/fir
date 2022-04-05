import React from "react";
import { Link } from "react-router-dom";

export const Scarico = () => {
  return (
    <div>
      <div>SCARICO</div>
      <div>CER 123456</div>
      <div>TOTALE mc 36/36</div>
      <form>
        <div>Rif. 1</div>
        <div>mc 16/36</div>
        <label htmlFor="mc">mc </label>
        <input type="number" name="mc" />
        <button>SCARICA</button>
      </form>
      <form>
        <div>Rif. 2</div>
        <div>mc 20/36</div>
        <label htmlFor="mc">mc </label>
        <input type="number" name="mc" />
        <button>SCARICA</button>
      </form>
      <button>
        <Link to="/">HOME</Link>
      </button>
    </div>
  );
};
