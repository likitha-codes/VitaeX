// VitaeX/client/src/pages/LandingPage.js

import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { WINE_MUTED, TEXT_MID } from "../components/styles/constants";
import ParticleBackground from "../components/ParticleBackground";
import Btn from "../components/Btn";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#F0EBE0", position: "relative" }}>
      <ParticleBackground />

      <div style={{
        position:       "relative",
        zIndex:         1,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        minHeight:      "100vh",
        padding:        "2rem",
        textAlign:      "center",
      }}>

        <img
          src={logo}
          alt="VitaeX"
          style={{
            width: "140px",
            height: "auto",
            display: "block",
            objectFit: "contain",
            marginBottom: "1rem",
          }}
        />

        <div style={{
          fontSize:      "11px",
          letterSpacing: "5px",
          color:         WINE_MUTED,
          textTransform: "uppercase",
          fontFamily:    "Georgia, serif",
          marginBottom:  "0.5rem",
        }}>
          Resume Optimiser
        </div>

        <p style={{
          fontSize:   "1rem",
          color:      TEXT_MID,
          maxWidth:   "420px",
          lineHeight: 1.8,
          margin:     "0 0 2.8rem",
          fontFamily: "Georgia, serif",
        }}>
          Build a polished resume from scratch, or upload yours for a deep analysis.
        </p>

        <div style={{
          display:        "flex",
          gap:            "1.2rem",
          flexWrap:       "wrap",
          justifyContent: "center"
        }}>
          <Btn onClick={() => navigate("/build")}>
            Build Resume
          </Btn>

          <Btn onClick={() => navigate("/upload")} outline>
            Upload Resume
          </Btn>
        </div>

        <p style={{
          marginTop:    "3rem",
          fontSize:     "11px",
          color:        WINE_MUTED,
          letterSpacing:"1px"
        }}>
          ✦ &nbsp; Private &amp; Secure &nbsp; ✦
        </p>

      </div>
    </div>
  );
}