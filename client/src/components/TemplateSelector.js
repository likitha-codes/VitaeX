// VitaeX/client/src/components/TemplateSelector.js

import { useNavigate } from "react-router-dom";
import ParticleBackground from "./ParticleBackground";
import NavBar from "./NavBar";
import Btn from "./Btn";
import { WINE, WINE_MUTED, BEIGE_BORDER, TEXT_MID, TEXT_DARK, BEIGE_DARK } from "./styles/constants";

const templates = [
  {
    id: 1,
    name: "Classic",
    description: "Centered header, clean sections, timeless layout",
    preview: (
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "7px", color: "#222", padding: "10px", background: "#fff", height: "160px", overflow: "hidden" }}>
        <div style={{ textAlign: "center", borderBottom: "1.5px solid #2a9d8f", paddingBottom: "6px", marginBottom: "6px" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#2a9d8f" }}>Your Name</div>
          <div style={{ color: "#555" }}>email@email.com | +91 00000 00000 | City, India</div>
        </div>
        <div style={{ fontWeight: "700", color: "#2a9d8f", letterSpacing: "1px", fontSize: "7px", marginBottom: "3px" }}>SUMMARY</div>
        <div style={{ color: "#555", marginBottom: "6px" }}>Professional summary goes here...</div>
        <div style={{ fontWeight: "700", color: "#2a9d8f", letterSpacing: "1px", fontSize: "7px", marginBottom: "3px" }}>SKILLS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px 8px" }}>
          {["Skill One", "Skill Two", "Skill Three", "Skill Four"].map((s, i) => (
            <div key={i}>• {s}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 2,
    name: "Modern",
    description: "Left-aligned, section dividers, professional feel",
    preview: (
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "7px", color: "#222", padding: "10px", background: "#fff", height: "160px", overflow: "hidden" }}>
        <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "2px" }}>Your Name</div>
        <div style={{ borderBottom: "2px solid #2a9d8f", marginBottom: "6px", paddingBottom: "4px", color: "#555" }}>email@email.com | +91 00000 00000 | City, India</div>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "4px 8px" }}>
          <div style={{ fontWeight: "700", color: "#333" }}>Summary</div>
          <div style={{ color: "#555" }}>Professional summary goes here in this modern layout style.</div>
          <div style={{ fontWeight: "700", color: "#333" }}>Skills</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {["Skill One", "Skill Two", "Skill Three", "Skill Four"].map((s, i) => (
              <div key={i}>• {s}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    name: "Split",
    description: "Two-column layout, contact sidebar on left",
    preview: (
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "7px", color: "#222", background: "#fff", height: "160px", overflow: "hidden", display: "flex" }}>
        <div style={{ width: "70px", background: "#f0f0f0", padding: "8px 6px", flexShrink: 0 }}>
          <div style={{ fontWeight: "700", marginBottom: "3px", color: "#333" }}>Contact</div>
          <div style={{ color: "#555", marginBottom: "6px" }}>email@email.com<br />+91 00000<br />City, India</div>
          <div style={{ fontWeight: "700", marginBottom: "3px", color: "#333" }}>Skills</div>
          {["Skill One", "Skill Two", "Skill Three"].map((s, i) => (
            <div key={i}>• {s}</div>
          ))}
        </div>
        <div style={{ padding: "8px", flex: 1 }}>
          <div style={{ fontSize: "13px", fontWeight: "700", marginBottom: "2px" }}>Your Name</div>
          <div style={{ borderLeft: "3px solid #333", paddingLeft: "5px", marginBottom: "6px", fontWeight: "700", fontSize: "7px" }}>SUMMARY</div>
          <div style={{ color: "#555", marginBottom: "6px" }}>Professional summary goes here...</div>
          <div style={{ borderLeft: "3px solid #333", paddingLeft: "5px", fontWeight: "700", fontSize: "7px" }}>EXPERIENCE</div>
        </div>
      </div>
    ),
  },
];

export default function TemplateSelector() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "#F0EBE0" }}>
      <ParticleBackground />
      <NavBar />
      <div style={{ position: "relative", zIndex: 1, padding: "6rem 2rem 4rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          {/* Heading */}
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, color: WINE, fontSize: "1.8rem", marginBottom: "0.3rem" }}>
            Choose a Template
          </h2>
          <p style={{ color: TEXT_MID, fontSize: "0.9rem", marginBottom: "2.5rem" }}>
            Select a style below. Your details will be filled in automatically.
          </p>

          {/* Template Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "2.5rem" }}>
            {templates.map((t) => (
              <div
                key={t.id}
                onClick={() => navigate(`/template/${t.id}`)}
                style={{
                  background:   "#fff",
                  border:       `1.5px solid ${BEIGE_BORDER}`,
                  borderRadius: "6px",
                  overflow:     "hidden",
                  cursor:       "pointer",
                  transition:   "all 0.2s",
                  boxShadow:    "0 2px 12px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = `1.5px solid ${WINE}`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(123,45,66,0.15)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = `1.5px solid ${BEIGE_BORDER}`;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                }}
              >
                {/* Preview */}
                <div style={{ borderBottom: `1px solid ${BEIGE_BORDER}`, overflow: "hidden" }}>
                  {t.preview}
                </div>
                {/* Label */}
                <div style={{ padding: "0.9rem 1rem" }}>
                  <p style={{ fontFamily: "Georgia, serif", fontWeight: 700, color: TEXT_DARK, margin: "0 0 3px", fontSize: "0.95rem" }}>
                    {t.name}
                  </p>
                  <p style={{ color: WINE_MUTED, fontSize: "0.78rem", margin: 0 }}>
                    {t.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Btn outline onClick={() => navigate("/result")}>← Back to Resume</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}