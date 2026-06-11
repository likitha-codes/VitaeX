// VitaeX/client/src/components/SectionTitle.js

import { WINE, BEIGE_BORDER } from "./styles/constants";

export default function SectionTitle({ children }) {
  return (
    <div style={{
      display:    "flex",
      alignItems: "center",
      gap:        "1rem",
      margin:     "2rem 0 1.2rem",
    }}>
      <span style={{
        fontSize:      "11px",
        letterSpacing: "3px",
        textTransform: "uppercase",
        color:         WINE,
        fontFamily:    "Georgia, serif",
        whiteSpace:    "nowrap",
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: "1px", background: BEIGE_BORDER }} />
    </div>
  );
}