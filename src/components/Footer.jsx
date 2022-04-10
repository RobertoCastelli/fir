import React from "react"
// IMAGES
import logo_itaf from "../images/logo-itaf.png"
import logo_euroamb from "../images/logo-euroamb.png"

export const Footer = () => {
  return (
    <div className="wrapper-footer">
      <img
        className="logo-euroamb-footer"
        src={logo_euroamb}
        alt="logo-euroamb"
      />
      <img className="logo-itaf-footer" src={logo_itaf} alt="logo-itaf" />
      <div className="copyright-footer"></div>
      copyright &copy; 2022 - Roberto Castelli
    </div>
  )
}
