// VitaeX/client/src/components/ResumeStrengthMeter.js

import { WINE, WINE_MUTED, BEIGE_BORDER, TEXT_DARK, TEXT_MID } from "./styles/constants";

// ── Colour per strength ────────────────────────────────────────────────────
function barColor(score) {
  if (score >= 75) return "#16a34a";
  if (score >= 50) return "#d97706";
  return "#dc2626";
}

// ── Label per strength ─────────────────────────────────────────────────────
function strengthLabel(score) {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Work";
}

// ── Block bar row ──────────────────────────────────────────────────────────
function StrengthRow({ label, score }) {
  const color      = barColor(score);
  const totalBlocks = 10;
  const filled      = Math.round((score / 100) * totalBlocks);

  return (
    <div style={{
      display:        "flex",
      alignItems:     "center",
      gap:            "1rem",
      marginBottom:   "0.9rem",
      flexWrap:       "wrap",
    }}>
      {/* Section name */}
      <span style={{
        width:      "180px",
        fontSize:   "0.88rem",
        color:      TEXT_DARK,
        fontFamily: "Georgia, serif",
        flexShrink: 0,
      }}>
        {label}
      </span>

      {/* Block bar */}
      <div style={{ display: "flex", gap: "3px", flex: 1 }}>
        {Array.from({ length: totalBlocks }, (_, i) => (
          <div
            key={i}
            style={{
              flex:         1,
              height:       "18px",
              borderRadius: "2px",
              background:   i < filled ? color : "#e5e7eb",
              transition:   `background 0.4s ease ${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Score + label */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        gap:            "6px",
        width:          "110px",
        justifyContent: "flex-end",
        flexShrink:     0,
      }}>
        <span style={{ fontSize: "0.88rem", fontWeight: "700", color, fontFamily: "Georgia, serif" }}>
          {score}%
        </span>
        <span style={{
          fontSize:     "0.72rem",
          color:        "#fff",
          background:   color,
          padding:      "1px 6px",
          borderRadius: "999px",
          fontFamily:   "Georgia, serif",
        }}>
          {strengthLabel(score)}
        </span>
      </div>
    </div>
  );
}

// ── Overall strength bar ───────────────────────────────────────────────────
function OverallBar({ average }) {
  const color = barColor(average);
  return (
    <div style={{
      background:   "#f9f9f9",
      border:       `1px solid ${BEIGE_BORDER}`,
      borderRadius: "4px",
      padding:      "0.8rem 1rem",
      marginBottom: "1.2rem",
      display:      "flex",
      alignItems:   "center",
      gap:          "1rem",
      flexWrap:     "wrap",
    }}>
      <span style={{ fontSize: "0.85rem", color: TEXT_MID, fontFamily: "Georgia, serif" }}>
        Overall Resume Strength
      </span>
      <div style={{ flex: 1, background: "#e5e7eb", borderRadius: "999px", height: "10px", overflow: "hidden" }}>
        <div style={{ width: `${average}%`, height: "100%", background: color, borderRadius: "999px", transition: "width 0.8s ease" }} />
      </div>
      <span style={{ fontWeight: "700", fontSize: "0.95rem", color, fontFamily: "Georgia, serif" }}>
        {average}%
      </span>
    </div>
  );
}

// ── Section labels mapping ─────────────────────────────────────────────────
const SECTION_LABELS = {
  professionalSummary: "Professional Summary",
  projects:            "Projects",
  experience:          "Experience",
  skills:              "Skills",
  education:           "Education",
};

// ── Main component ─────────────────────────────────────────────────────────
export default function ResumeStrengthMeter({ sectionStrengths }) {
  const sections = sectionStrengths || {
    professionalSummary: 0,
    projects:            0,
    experience:          0,
    skills:              0,
    education:           0,
  };

  const values  = Object.values(sections);
  const average = values.length
    ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
    : 0;

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
      <span style={sectionLabel}>Resume Strength Meter</span>

      {/* Overall bar */}
      <OverallBar average={average} />

      {/* Per-section bars */}
      {Object.entries(sections).map(([key, score]) => (
        <StrengthRow
          key={key}
          label={SECTION_LABELS[key] || key}
          score={score}
        />
      ))}

      {/* Legend */}
      <div style={{
        display:    "flex",
        gap:        "1rem",
        marginTop:  "1rem",
        flexWrap:   "wrap",
        paddingTop: "0.8rem",
        borderTop:  `1px solid ${BEIGE_BORDER}`,
      }}>
        {[
          { color: "#16a34a", label: "Strong (80+)" },
          { color: "#d97706", label: "Good (60–79)" },
          { color: "#dc2626", label: "Needs Work (<60)" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: color }} />
            <span style={{ fontSize: "0.75rem", color: TEXT_MID }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}