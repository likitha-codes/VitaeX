// VitaeX/client/src/pages/AnalysisPage.js

import { useLocation, useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import NavBar from "../components/NavBar";
import Btn from "../components/Btn";
import { WINE, WINE_MUTED, BEIGE_DARK, BEIGE_BORDER, TEXT_MID } from "../components/styles/constants";

export default function AnalysisPage() {
  const location = useLocation();
  const navigate  = useNavigate();
  const result    = location.state?.result;

  if (!result) {
    return (
      <div style={{ minHeight: "100vh", background: "#F0EBE0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: WINE, fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>No analysis data found.</p>
          <Btn onClick={() => navigate("/upload")} style={{ marginTop: "1rem" }}>Go Back</Btn>
        </div>
      </div>
    );
  }

  const { score, requiredSkills, missingSkills, tips, professionalSummary } = result;

  const scoreColor =
    score >= 75 ? "#2e7d32" :
    score >= 50 ? "#f57c00" :
    "#c62828";

  return (
    <div style={{ minHeight: "100vh", background: "#F0EBE0", position: "relative" }}>
      <ParticleBackground />
      <NavBar />

      <div style={{
        position:      "relative",
        zIndex:        1,
        maxWidth:      "760px",
        margin:        "0 auto",
        padding:       "6rem 2rem 4rem",
      }}>

        {/* Heading */}
        <h2 style={{
          fontFamily:   "Georgia, serif",
          fontWeight:   400,
          color:        WINE,
          fontSize:     "1.8rem",
          marginBottom: "0.3rem",
          textAlign:    "center",
        }}>
          Resume Analysis
        </h2>
        <p style={{ color: WINE_MUTED, textAlign: "center", fontSize: "0.9rem", marginBottom: "2.5rem" }}>
          Here's how your resume stacks up for your target role.
        </p>

        {/* Score Card */}
        <div style={{
          background:    "#fff",
          border:        `1px solid ${BEIGE_BORDER}`,
          borderRadius:  "6px",
          padding:       "2rem",
          textAlign:     "center",
          marginBottom:  "1.5rem",
        }}>
          <p style={{ color: TEXT_MID, fontSize: "0.85rem", marginBottom: "0.5rem", letterSpacing: "1px", textTransform: "uppercase" }}>Resume Score</p>
          <div style={{
            fontSize:   "4rem",
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            color:      scoreColor,
            lineHeight: 1,
          }}>
            {score}
          </div>
          <p style={{ color: WINE_MUTED, fontSize: "0.85rem", marginTop: "0.4rem" }}>out of 100</p>

          {/* Score bar */}
          <div style={{ background: BEIGE_DARK, borderRadius: "99px", height: "8px", marginTop: "1rem", overflow: "hidden" }}>
            <div style={{
              width:        `${score}%`,
              height:       "100%",
              background:   scoreColor,
              borderRadius: "99px",
              transition:   "width 1s ease",
            }} />
          </div>
        </div>

        {/* Required Skills */}
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Required Skills for This Role</h3>
          <div style={tagContainer}>
            {requiredSkills.map((skill, i) => (
              <span key={i} style={{ ...tag, background: "#e8f5e9", color: "#2e7d32", border: "1px solid #a5d6a7" }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Skills Missing from Your Resume</h3>
          {missingSkills.length === 0 ? (
            <p style={{ color: "#2e7d32", fontSize: "0.9rem" }}>🎉 Great! No major skills missing.</p>
          ) : (
            <div style={tagContainer}>
              {missingSkills.map((skill, i) => (
                <span key={i} style={{ ...tag, background: "#ffebee", color: "#c62828", border: "1px solid #ef9a9a" }}>
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tips */}
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Actionable Tips</h3>
          <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
            {tips.map((tip, i) => (
              <li key={i} style={{ color: TEXT_MID, fontSize: "0.9rem", marginBottom: "0.6rem", lineHeight: 1.6 }}>
                {tip}
              </li>
            ))}
          </ol>
        </div>

        {/* Professional Summary */}
        {professionalSummary && (
          <div style={cardStyle}>
            <h3 style={sectionTitle}>Suggested Professional Summary</h3>
            <p style={{ color: TEXT_MID, fontSize: "0.9rem", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
              "{professionalSummary}"
            </p>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
          <Btn outline onClick={() => navigate("/upload")}>← Analyse Another</Btn>
          <Btn onClick={() => navigate("/build")}>Build Resume →</Btn>
        </div>

      </div>
    </div>
  );
}

// -------------------------
// Styles
// -------------------------
const cardStyle = {
  background:   "#fff",
  border:       `1px solid #E2D9CC`,
  borderRadius: "6px",
  padding:      "1.5rem",
  marginBottom: "1.5rem",
};

const sectionTitle = {
  fontFamily:   "Georgia, serif",
  fontWeight:   400,
  color:        "#6B2737",
  fontSize:     "1rem",
  marginTop:    0,
  marginBottom: "1rem",
};

const tagContainer = {
  display:   "flex",
  flexWrap:  "wrap",
  gap:       "0.5rem",
};

const tag = {
  padding:      "0.3rem 0.8rem",
  borderRadius: "99px",
  fontSize:     "0.82rem",
  fontWeight:   500,
};