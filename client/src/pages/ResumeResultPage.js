// VitaeX/client/src/pages/ResumeResultPage.js

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import NavBar from "../components/NavBar";
import LivePreview from "../components/LivePreview";
import Btn from "../components/Btn";
import { WINE, WINE_MUTED } from "../components/styles/constants";

export default function ResumeResultPage({ form }) {
  const navigate   = useNavigate();
  const previewRef = useRef(null);

  const handleDownload = () => {
  const printContents = previewRef.current.innerHTML;
  const printWindow = window.open("", "_blank");
  
  if (!printWindow) {
    alert("Please allow popups for this site to download the PDF.");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${form.name || "Resume"} — VitaeX</title>
        <style>
          @page { size: A4; margin: 15mm 18mm; }
* { box-sizing: border-box; }
body { 
  margin: 0; 
  padding: 0; 
  font-family: Arial, Helvetica, sans-serif;
  width: 210mm;
  max-width: 210mm;
  font-size: 13px;
  line-height: 1.5;
  color: #111;
}
        </style>
      </head>
      <body>${printContents}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};
const handleAnalyse = async () => {
  try {
    const response = await fetch("https://vitaex.onrender.com/api/analyse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobTitle: form.headline, skills: form.skills, experience: form.experience, education: form.education,}),
    });
    const data = await response.json();
    navigate("/analysis", { state: { result: data } });
  } catch (error) {
    console.error("Analysis failed:", error);
  }
};
  return (
    <div style={{ minHeight: "100vh", background: "#F0EBE0" }}>
      <ParticleBackground />
      <NavBar />
      <div style={{ position: "relative", zIndex: 1, padding: "6rem 2rem 4rem" }}>

        {/* Top bar */}
        <div style={{
          maxWidth:       "820px",
          margin:         "0 auto 1.5rem",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          flexWrap:       "wrap",
          gap:            "1rem",
        }}>
          <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 400, color: WINE, fontSize: "1.4rem", margin: 0 }}>
            Your Resume
          </h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Btn outline small onClick={() => navigate("/build")}>← Edit</Btn>
            <Btn small onClick={handleDownload}>Download PDF</Btn>
            <Btn small onClick={() => navigate("/edit")}>Edit Resume</Btn>
            <Btn small onClick={handleAnalyse}>Analyse Resume</Btn>
            <Btn small onClick={() => navigate("/templates")}>Choose Template</Btn>
          </div>
        </div>

        {/* Resume preview */}
        <div style={{
          maxWidth:     "820px",
          margin:       "0 auto",
          boxShadow:    "0 4px 32px rgba(0,0,0,0.10)",
          borderRadius: "2px",
          overflowX:    "auto",
        }}>
          <LivePreview ref={previewRef} data={form} />
        </div>

        <p style={{ textAlign: "center", color: WINE_MUTED, fontSize: "12px", marginTop: "1rem" }}>
          ✦ &nbsp; Use Download PDF or Ctrl+P / Cmd+P to save &nbsp; ✦
        </p>
      </div>
    </div>
  );
}