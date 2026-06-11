// VitaeX/client/src/components/ATSbreakdown.js

import { WINE, WINE_MUTED, BEIGE_BORDER, TEXT_DARK, TEXT_MID } from "./styles/constants";

function scoreColor(s) {
  if (s >= 75) return "#16a34a";
  if (s >= 50) return "#d97706";
  return "#dc2626";
}

function MetricRow({ label, score }) {
  const color = scoreColor(score);
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        marginBottom:   "5px",
      }}>
        <span style={{ fontSize: "0.88rem", color: TEXT_DARK, fontFamily: "Georgia, serif" }}>
          {label}
        </span>
        <span style={{ fontSize: "0.88rem", fontWeight: "700", color, fontFamily: "Georgia, serif" }}>
          {score}/100
        </span>
      </div>
      <div style={{ background: "#e5e7eb", borderRadius: "999px", height: "8px", overflow: "hidden" }}>
        <div style={{
          width:        `${score}%`,
          height:       "100%",
          background:   color,
          borderRadius: "999px",
          transition:   "width 0.8s ease",
        }} />
      </div>
    </div>
  );
}

function ScoreCircle({ score }) {
  const color = scoreColor(score);
  const deg   = score * 3.6;
  return (
    <div style={{
      width:          "100px",
      height:         "100px",
      borderRadius:   "50%",
      background:     `conic-gradient(${color} ${deg}deg, #e5e7eb 0deg)`,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      flexShrink:     0,
    }}>
      <div style={{
        width:          "72px",
        height:         "72px",
        background:     "#fff",
        borderRadius:   "50%",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
      }}>
        <span style={{ fontWeight: "700", fontSize: "20px", color, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: "9px", color: TEXT_MID, letterSpacing: "0.5px" }}>/ 100</span>
      </div>
    </div>
  );
}

export default function ATSbreakdown({ score, breakdown }) {
  const {
    skillsMatch      = 0,
    formatting       = 0,
    keywords         = 0,
    experienceImpact = 0,
  } = breakdown || {};

  const sectionLabel = {
    fontSize:      "10px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color:         WINE_MUTED,
    fontFamily:    "Georgia, serif",
    marginBottom:  "1rem",
    display:       "block",
  };

  return (
    <div style={{
      background:   "#fff",
      border:       `1px solid ${BEIGE_BORDER}`,
      borderRadius: "6px",
      padding:      "1.5rem",
      marginBottom: "1.2rem",
    }}>
      <span style={sectionLabel}>ATS Compatibility Score</span>

      <div style={{
        display:      "flex",
        alignItems:   "center",
        gap:          "1.5rem",
        marginBottom: "1.5rem",
        flexWrap:     "wrap",
      }}>
        <ScoreCircle score={score} />
        <div>
          <p style={{
            fontFamily: "Georgia, serif",
            fontSize:   "1.1rem",
            fontWeight: "700",
            color:      TEXT_DARK,
            margin:     "0 0 4px",
          }}>
            Overall ATS Score
          </p>
          <p style={{ color: TEXT_MID, fontSize: "0.85rem", margin: 0 }}>
            {score >= 75
              ? "Strong ATS compatibility. Your resume is well optimised."
              : score >= 50
              ? "Moderate compatibility. A few improvements will boost your score."
              : "Low ATS score. Focus on the areas below to improve visibility."}
          </p>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${BEIGE_BORDER}`, marginBottom: "1.2rem" }} />

      <MetricRow label="Skills Match"      score={skillsMatch} />
      <MetricRow label="Formatting"        score={formatting} />
      <MetricRow label="Keywords"          score={keywords} />
      <MetricRow label="Experience Impact" score={experienceImpact} />
    </div>
  );
}