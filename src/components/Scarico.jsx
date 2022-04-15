// import React, { useContext } from "react";
// // COMPONENTS
// import { Content } from "./Content";
// // ICONS
// import { BsMinecartLoaded } from "react-icons/bs";
// import { FiUpload } from "react-icons/fi";
// // CONTEXT
// import { ContextData } from "../context";
// import { LogFiltered } from "./LogFiltered";

// export const Scarico = () => {
//   const { selectedCer, rifProgressivo } = useContext(ContextData);

//   return (
//     <>
//       {selectedCer[0].mc ? (
//         <div
//           className="wrapper-scarico"
//           style={{ color: selectedCer[0].colore }}
//         >
//           <div className="title-scarico">SCARICO</div>
//           <div className="cer-scarico">CER {selectedCer[0].cer}</div>
//           <div className="descrizione-scarico">
//             {selectedCer[0].descrizione}
//           </div>
//           <div className="rif-scarico">Rif. {rifProgressivo}/2022</div>
//           <div className="mc-scarico">
//             {selectedCer[0].mc} / 36 <BsMinecartLoaded />
//           </div>
//           <div className="log-scarico">
//             <LogFiltered />
//           </div>
//           <button className="carico-scarico">
//             <FiUpload size={20} />
//           </button>
//         </div>
//       ) : (
//         <Content />
//       )}
//     </>
//   );
// };
