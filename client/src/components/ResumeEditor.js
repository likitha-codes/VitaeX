// VitaeX/client/src/components/ResumeEditor.js
// Inline editable resume — every field is clickable and editable directly on the preview.
// Renders in A4 format. On save, updates the form state and navigates to result page.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "./Btn";
import { WINE, WINE_MUTED } from "./styles/constants";

// ── Inline editable field ──────────────────────────────────────────────────
// Click to edit, blur to save. Renders as plain text when not editing.
function EditableField({ value, onChange, multiline = false, style = {} }) {
  const [editing, setEditing] = useState(false);

  const baseStyle = {
    ...style,
    outline:      "none",
    borderBottom: editing ? `1px dashed ${WINE_MUTED}` : "1px dashed transparent",
    cursor:       editing ? "text" : "pointer",
    background:   editing ? "#fffaf8" : "transparent",
    padding:      "1px 2px",
    borderRadius: "1px",
    transition:   "border-color 0.15s, background 0.15s",
    width:        "100%",
    boxSizing:    "border-box",
    fontFamily:   "inherit",
    fontSize:     "inherit",
    color:        "inherit",
    lineHeight:   "inherit",
    fontWeight:   "inherit",
    resize:       "none",
  };

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setEditing(true)}
        onBlur={()  => setEditing(false)}
        rows={3}
        style={{ ...baseStyle, display: "block" }}
        title="Click to edit"
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setEditing(true)}
      onBlur={()  => setEditing(false)}
      style={{ ...baseStyle, display: "inline-block" }}
      title="Click to edit"
    />
  );
}

// ── Resume styles (A4, black & white) ─────────────────────────────────────
const rs = {
  page: {
    width:      "210mm",
    minHeight:  "297mm",
    margin:     "0 auto",
    background: "#fff",
    padding:    "16mm 18mm",
    fontFamily: "Arial, Helvetica, sans-serif",
    color:      "#111",
    fontSize:   "13px",
    lineHeight: "1.5",
    boxSizing:  "border-box",
  },
  name:        { fontSize: "22px", fontWeight: "700", margin: "0 0 2px" },
  headline:    { fontSize: "13px", color: "#444", margin: "0 0 10px" },
  divider:     { border: "none", borderTop: "1.5px solid #222", margin: "0 0 10px" },
  sectionHead: {
    fontSize:      "11px",
    fontWeight:    "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    margin:        "14px 0 4px",
    color:         "#111",
  },
  thinDiv: { border: "none", borderTop: "0.8px solid #bbb", margin: "0 0 6px" },
  bold:    { fontWeight: "700", margin: "0 0 2px", display: "block" },
};

// ── Main ResumeEditor component ────────────────────────────────────────────
export default function ResumeEditor({ form, setForm }) {
  const navigate = useNavigate();

  // Local copy — edits stay local until "Save Changes" is clicked
  const [draft, setDraft] = useState({ ...form });

  const set = (key, val) => setDraft(d => ({ ...d, [key]: val }));

  const updArr = (key, i, field, val) => {
    const arr = [...draft[key]];
    arr[i] = { ...arr[i], [field]: val };
    set(key, arr);
  };

  const handleSave = () => {
    setForm(draft);
    navigate("/result");
  };

  const skills = Array.isArray(draft.skills)
    ? draft.skills.filter(Boolean)
    : (draft.skills ? draft.skills.split(",").map(s => s.trim()).filter(Boolean) : []);

  const certs = draft.certifications
    ? draft.certifications.split("\n").filter(Boolean)
    : [];

  const langs = draft.languages
    ? draft.languages.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div>
      {/* ── Toolbar ── */}
      <div style={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        flexWrap:       "wrap",
        gap:            "1rem",
        maxWidth:       "820px",
        margin:         "0 auto 1.5rem",
      }}>
        <div>
          <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 400, color: WINE, fontSize: "1.4rem", margin: "0 0 4px" }}>
            Edit Resume
          </h2>
          <p style={{ fontSize: "0.82rem", color: WINE_MUTED, margin: 0 }}>
            Click on any field to edit it directly.
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Btn outline small onClick={() => navigate("/result")}>← Cancel</Btn>
          <Btn small onClick={handleSave}>Save Changes →</Btn>
        </div>
      </div>

      {/* ── A4 Resume with inline editing ── */}
      <div style={{
        maxWidth:     "820px",
        margin:       "0 auto",
        boxShadow:    "0 4px 32px rgba(0,0,0,0.10)",
        borderRadius: "2px",
        overflowX:    "auto",
      }}>
        <div style={rs.page}>

          {/* Header */}
          <EditableField
            value={draft.name}
            onChange={v => set("name", v)}
            style={rs.name}
          />
          <EditableField
            value={draft.headline}
            onChange={v => set("headline", v)}
            style={rs.headline}
          />
          <hr style={rs.divider} />

          {/* Summary */}
          {draft.summary !== undefined && (
            <>
              <p style={rs.sectionHead}>Professional Summary</p>
              <hr style={rs.thinDiv} />
              <EditableField
                value={draft.summary}
                onChange={v => set("summary", v)}
                multiline
                style={{ margin: "0 0 6px", color: "#222" }}
              />
            </>
          )}

          {/* Experience */}
          {draft.experience?.length > 0 && (
            <>
              <p style={rs.sectionHead}>Professional Experience</p>
              <hr style={rs.thinDiv} />
              {draft.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "baseline" }}>
                    <EditableField
                      value={exp.role}
                      onChange={v => updArr("experience", i, "role", v)}
                      style={{ fontWeight: "700", fontSize: "13px" }}
                    />
                    <span style={{ color: "#555" }}>—</span>
                    <EditableField
                      value={exp.company}
                      onChange={v => updArr("experience", i, "company", v)}
                      style={{ fontSize: "13px" }}
                    />
                    <span style={{ color: "#555" }}>|</span>
                    <EditableField
                      value={exp.duration}
                      onChange={v => updArr("experience", i, "duration", v)}
                      style={{ color: "#555", fontSize: "13px" }}
                    />
                  </div>
                  <EditableField
                    value={exp.description}
                    onChange={v => updArr("experience", i, "description", v)}
                    multiline
                    style={{ color: "#333", marginTop: "2px" }}
                  />
                </div>
              ))}
            </>
          )}

          {/* Projects */}
          {draft.projects?.some(p => p.name) && (
            <>
              <p style={rs.sectionHead}>Projects</p>
              <hr style={rs.thinDiv} />
              {draft.projects.map((proj, i) =>
                proj.name ? (
                  <div key={i} style={{ marginBottom: "8px" }}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "baseline" }}>
                      <EditableField
                        value={proj.name}
                        onChange={v => updArr("projects", i, "name", v)}
                        style={{ fontWeight: "700", fontSize: "13px" }}
                      />
                      <span style={{ color: "#555" }}>—</span>
                      <EditableField
                        value={proj.tech}
                        onChange={v => updArr("projects", i, "tech", v)}
                        style={{ color: "#555", fontSize: "13px" }}
                      />
                    </div>
                    <EditableField
                      value={proj.description}
                      onChange={v => updArr("projects", i, "description", v)}
                      multiline
                      style={{ color: "#333", marginTop: "2px" }}
                    />
                  </div>
                ) : null
              )}
            </>
          )}

          {/* Skills — 2 columns, black bullets */}
          {skills.length > 0 && (
            <>
              <p style={rs.sectionHead}>Skills</p>
              <hr style={rs.thinDiv} />
              <div style={{
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 "4px 24px",
                marginBottom:        "6px",
              }}>
                {(Array.isArray(draft.skills) ? draft.skills : skills).map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ fontSize: "16px", lineHeight: 1, color: "#111", flexShrink: 0 }}>•</span>
                    <EditableField
                      value={s}
                      onChange={v => {
                        const arr = Array.isArray(draft.skills) ? [...draft.skills] : [...skills];
                        arr[i] = v;
                        set("skills", arr);
                      }}
                      style={{ fontSize: "13px", color: "#111" }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Education */}
          {draft.education?.some(e => e.institution || e.degree) && (
            <>
              <p style={rs.sectionHead}>Education</p>
              <hr style={rs.thinDiv} />
              {draft.education.map((edu, i) =>
                edu.institution || edu.degree ? (
                  <div key={i} style={{ marginBottom: "7px" }}>
                    <EditableField
                      value={edu.degree}
                      onChange={v => updArr("education", i, "degree", v)}
                      style={{ fontWeight: "700", fontSize: "13px" }}
                    />
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", color: "#333" }}>
                      <EditableField
                        value={edu.institution}
                        onChange={v => updArr("education", i, "institution", v)}
                        style={{ color: "#333", fontSize: "13px" }}
                      />
                      <EditableField
                        value={edu.year}
                        onChange={v => updArr("education", i, "year", v)}
                        style={{ color: "#555", fontSize: "13px" }}
                      />
                      {edu.cgpa && (
                        <EditableField
                          value={edu.cgpa}
                          onChange={v => updArr("education", i, "cgpa", v)}
                          style={{ color: "#555", fontSize: "13px" }}
                        />
                      )}
                    </div>
                  </div>
                ) : null
              )}
            </>
          )}

          {/* Certifications */}
          {certs.length > 0 && (
            <>
              <p style={rs.sectionHead}>Certifications</p>
              <hr style={rs.thinDiv} />
              <EditableField
                value={draft.certifications}
                onChange={v => set("certifications", v)}
                multiline
                style={{ color: "#222", fontSize: "13px" }}
              />
            </>
          )}

          {/* Languages */}
          {langs.length > 0 && (
            <>
              <p style={rs.sectionHead}>Languages</p>
              <hr style={rs.thinDiv} />
              <EditableField
                value={draft.languages}
                onChange={v => set("languages", v)}
                style={{ color: "#222", fontSize: "13px" }}
              />
            </>
          )}

          {/* Contact */}
          <p style={rs.sectionHead}>Contact Information</p>
          <hr style={rs.thinDiv} />
          <ul style={{ margin: 0, paddingLeft: "18px" }}>
            {draft.phone    && <li><strong>Phone:</strong> <EditableField value={draft.phone}    onChange={v => set("phone", v)}    style={{ fontSize: "13px" }} /></li>}
            {draft.email    && <li><strong>Email:</strong> <EditableField value={draft.email}    onChange={v => set("email", v)}    style={{ fontSize: "13px" }} /></li>}
            {draft.location && <li><strong>Location:</strong> <EditableField value={draft.location} onChange={v => set("location", v)} style={{ fontSize: "13px" }} /></li>}
            {draft.linkedin && <li><strong>LinkedIn:</strong> <EditableField value={draft.linkedin} onChange={v => set("linkedin", v)} style={{ fontSize: "13px" }} /></li>}
            {draft.portfolio && <li><strong>Portfolio:</strong> <EditableField value={draft.portfolio} onChange={v => set("portfolio", v)} style={{ fontSize: "13px" }} /></li>}
          </ul>
        </div>
      </div>
    </div>
  );
}