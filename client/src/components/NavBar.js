// VitaeX/client/src/components/NavBar.js

import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { BEIGE, BEIGE_BORDER, WINE_MUTED } from "./styles/constants";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div style={{
      position:       "fixed",
      top:            0,
      left:           0,
      right:          0,
      zIndex:         100,
      background:     `${BEIGE}ee`,
      backdropFilter: "blur(8px)",
      borderBottom:   `1px solid ${BEIGE_BORDER}`,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "space-between",
      padding:        "0.6rem 2.5rem",
    }}>
      <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img
          src={logo}
          alt="VitaeX"
          style={{
            height: "55px",
            width: "auto",
            objectFit: "contain",
            display: "block"
          }}
        />
      </div>

      <span style={{
        fontSize:      "11px",
        letterSpacing: "3px",
        color:         WINE_MUTED,
        textTransform: "uppercase",
        fontFamily:    "Georgia, serif",
      }}>
        Resume Optimiser
      </span>
    </div>
  );
}