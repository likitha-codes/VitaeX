// VitaeX/client/src/pages/UploadResumePage.js

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import NavBar from "../components/NavBar";
import Btn from "../components/Btn";
import { WINE, WINE_MUTED, BEIGE_DARK, BEIGE_BORDER, TEXT_MID } from "../components/styles/constants";

export default function UploadResumePage() {
  const navigate   = useNavigate();
  const inputRef   = useRef(null);
  const [file, setFile]       = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError]     = useState("");

  const handleFile = (f) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      setFile(null);
      return;
    }
    setError("");
    setFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = ()  => setDragging(false);

  return (
    <div style={{ minHeight: "100vh", background: "#F0EBE0", position: "relative" }}>
      <ParticleBackground />
      <NavBar />

      <div style={{
        position:       "relative",
        zIndex:         1,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        minHeight:      "100vh",
        padding:        "6rem 2rem 4rem",
      }}>
        <div style={{ maxWidth: "520px", width: "100%", textAlign: "center" }}>

          {/* Heading */}
          <h2 style={{
            fontFamily:   "Georgia, serif",
            fontWeight:   400,
            color:        WINE,
            fontSize:     "1.8rem",
            marginBottom: "0.3rem",
          }}>
            Upload Your Resume
          </h2>
          <p style={{ color: TEXT_MID, fontSize: "0.9rem", marginBottom: "2rem" }}>
            PDF format only. Your resume will be sent for analysis.
          </p>

          {/* Drop zone */}
          <div
            onClick={() => inputRef.current.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            style={{
              border:       `2px dashed ${dragging ? WINE : BEIGE_BORDER}`,
              borderRadius: "4px",
              padding:      "3rem 2rem",
              cursor:       "pointer",
              transition:   "all 0.2s",
              background:   dragging ? `${WINE}08` : "#fff",
              marginBottom: "1rem",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>📄</div>
            {file ? (
              <p style={{ color: WINE, fontFamily: "Georgia, serif", margin: 0 }}>
                ✓ &nbsp;{file.name}
              </p>
            ) : (
              <>
                <p style={{ color: TEXT_MID, fontFamily: "Georgia, serif", margin: "0 0 6px" }}>
                  Drag &amp; drop your PDF here
                </p>
                <p style={{ color: WINE_MUTED, fontSize: "0.82rem", margin: 0 }}>
                  or click to browse
                </p>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={e => handleFile(e.target.files[0])}
            />
          </div>

          {/* Error */}
          {error && (
            <p style={{ color: "#c0392b", fontSize: "0.85rem", marginBottom: "1rem" }}>
              ⚠ {error}
            </p>
          )}

          {/* File info pill */}
          {file && (
            <div style={{
              background:   BEIGE_DARK,
              border:       `1px solid ${BEIGE_BORDER}`,
              borderRadius: "4px",
              padding:      "0.7rem 1rem",
              marginBottom: "1.5rem",
              display:      "flex",
              justifyContent: "space-between",
              alignItems:   "center",
              fontSize:     "0.85rem",
              color:        TEXT_MID,
            }}>
              <span>📎 &nbsp;{file.name}</span>
              <span style={{ color: WINE_MUTED }}>
                {(file.size / 1024).toFixed(1)} KB
              </span>
              <button
                onClick={() => setFile(null)}
                style={{
                  background: "transparent",
                  border:     "none",
                  cursor:     "pointer",
                  color:      WINE_MUTED,
                  fontSize:   "16px",
                }}
              >
                ×
              </button>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Btn outline onClick={() => navigate("/")}>← Back</Btn>
            <Btn
              onClick={() => file && navigate("/analysis", { state: { file } })}
              outline={!file}
            >
              {file ? "Analyse Resume →" : "Select a file first"}
            </Btn>
          </div>

          <p style={{ marginTop: "2rem", fontSize: "11px", color: WINE_MUTED, letterSpacing: "1px" }}>
            ✦ &nbsp; Your file is never stored permanently &nbsp; ✦
          </p>
        </div>
      </div>
    </div>
  );
}