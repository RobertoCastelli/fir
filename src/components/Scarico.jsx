import React from "react";

export const Scarico = () => {
  return (
    <div>
      <div>SCARICO</div>
      <div>CER 123456</div>
      <div>Rif. 1</div>
      <div>mc 36/36</div>
      <form>
        <label htmlFor="mc">mc </label>
        <input type="number" name="mc" />
        <button>SCARICA</button>
      </form>
      <hr />
    </div>
  );
};
