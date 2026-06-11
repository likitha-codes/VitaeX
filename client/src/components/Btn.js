// VitaeX/client/src/components/Btn.js

import { useState } from "react";
import { WINE, WINE_LIGHT, BEIGE, BEIGE_DARK } from "./styles/constants";

export default function Btn({ children, onClick, outline = false, small = false }) {
  const [hov, setHov] = useState(false);

  const base = {
    padding:       small ? "0.55rem 1.4rem" : "0.9rem 2.2rem",
    fontSize:      small ? "0.82rem" : "0.9rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontFamily:    "Georgia, serif",
    borderRadius:  "1px",
    cursor:        "pointer",
    transition:    "all 0.2s",
    transform:     hov ? "translateY(-2px)" : "translateY(0)",
  };

  const filled = {
    ...base,
    background: hov ? WINE_LIGHT : WINE,
    color:      BEIGE,
    border:     "none",
  };

  const outl = {
    ...base,
    background: hov ? BEIGE_DARK : "transparent",
    color:      WINE,
    border:     `1.5px solid ${WINE}`,
  };

  return (
    <button
      style={outline ? outl : filled}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </button>
  );
}