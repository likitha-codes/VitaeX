// VitaeX/client/src/pages/TemplatePage.js

import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import NavBar from "../components/NavBar";
import Btn from "../components/Btn";
import { WINE, WINE_MUTED } from "../components/styles/constants";

// ── Shared helpers ─────────────────────────────────────────────────────────
function getSkills(form) {
  return Array.isArray(form.skills)
    ? form.skills.filter(Boolean)
    : (form.skills ? form.skills.split(",").map(s => s.trim()).filter(Boolean) : []);
}

function getLangs(form) {
  return form.languages
    ? form.languages.split(",").map(s => s.trim()).filter(Boolean)
    : [];
}

function getCerts(form) {
  return form.certifications
    ? form.certifications.split("\n").filter(Boolean)
    : [];
}

// ══════════════════════════════════════════════════════════════════════════
// TEMPLATE 1 — Classic (centered header, teal accents)
// ══════════════════════════════════════════════════════════════════════════
function Template1({ form }) {
  const skills = getSkills(form);
  const langs  = getLangs(form);
  const certs  = getCerts(form);
  const TEAL   = "#2a9d8f";

  const sh = { fontSize: "9px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", color: TEAL, margin: "14px 0 4px" };
  const div = { border: "none", borderTop: `1px solid ${TEAL}44`, margin: "0 0 6px" };

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", color: "#222", background: "#fff", padding: "18mm 16mm", minHeight: "297mm", width: "210mm", boxSizing: "border-box" }}>
      {/* Header */}
      <div style={{ textAlign: "center", borderBottom: `2px solid ${TEAL}`, paddingBottom: "10px", marginBottom: "10px" }}>
        <div style={{ fontSize: "22px", fontWeight: "700", color: TEAL }}>{form.name || "Your Name"}</div>
        {form.headline && <div style={{ color: "#555", fontSize: "12px", marginTop: "2px" }}>{form.headline}</div>}
        <div style={{ color: "#666", fontSize: "11px", marginTop: "4px" }}>
          {[form.email, form.phone, form.location].filter(Boolean).join("  |  ")}
        </div>
        {(form.linkedin || form.portfolio) && (
          <div style={{ color: "#666", fontSize: "11px" }}>
            {[form.linkedin, form.portfolio].filter(Boolean).join("  |  ")}
          </div>
        )}
      </div>

      {/* Summary */}
      {form.summary && (<><p style={sh}>Summary</p><hr style={div} /><p style={{ margin: "0 0 6px" }}>{form.summary}</p></>)}

      {/* Skills */}
      {skills.length > 0 && (
        <><p style={sh}>Skills</p><hr style={div} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 24px", marginBottom: "6px" }}>
            {skills.map((s, i) => <div key={i}>• {s}</div>)}
          </div>
        </>
      )}

      {/* Experience */}
      {form.experience?.some(e => e.company || e.role) && (
        <><p style={sh}>Experience</p><hr style={div} />
          {form.experience.map((exp, i) => exp.company || exp.role ? (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ fontWeight: "700" }}>{exp.role}{exp.company ? ` — ${exp.company}` : ""}{exp.duration ? <span style={{ fontWeight: 400, color: "#555" }}> | {exp.duration}</span> : ""}</div>
              {exp.description && <div style={{ color: "#444", marginTop: "2px" }}>{exp.description}</div>}
            </div>
          ) : null)}
        </>
      )}

      {/* Projects */}
      {form.projects?.some(p => p.name) && (
        <><p style={sh}>Projects</p><hr style={div} />
          {form.projects.map((proj, i) => proj.name ? (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ fontWeight: "700" }}>{proj.name}{proj.tech ? <span style={{ fontWeight: 400, color: "#555" }}> ({proj.tech})</span> : ""}</div>
              {proj.description && <div style={{ color: "#444", marginTop: "2px" }}>{proj.description}</div>}
            </div>
          ) : null)}
        </>
      )}

      {/* Education */}
      {form.education?.some(e => e.institution || e.degree) && (
        <><p style={sh}>Education and Training</p><hr style={div} />
          {form.education.map((edu, i) => edu.institution || edu.degree ? (
            <div key={i} style={{ marginBottom: "7px" }}>
              <div style={{ fontWeight: "700" }}>{edu.degree}</div>
              <div style={{ color: "#444" }}>{edu.institution}{edu.year ? ` | ${edu.year}` : ""}{edu.cgpa ? ` | ${edu.cgpa}` : ""}</div>
            </div>
          ) : null)}
        </>
      )}

      {/* Certifications */}
      {certs.length > 0 && (<><p style={sh}>Certifications</p><hr style={div} /><ul style={{ margin: "0 0 6px", paddingLeft: "18px" }}>{certs.map((c, i) => <li key={i}>{c}</li>)}</ul></>)}

      {/* Languages */}
      {langs.length > 0 && (<><p style={sh}>Languages</p><hr style={div} /><p style={{ margin: 0 }}>{langs.join(" · ")}</p></>)}

      {/* Contact */}
      <p style={sh}>Contact Information</p><hr style={div} />
      <ul style={{ margin: 0, paddingLeft: "18px" }}>
        {form.phone    && <li><strong>Phone:</strong> {form.phone}</li>}
        {form.email    && <li><strong>Email:</strong> {form.email}</li>}
        {form.location && <li><strong>Location:</strong> {form.location}</li>}
        {form.linkedin && <li><strong>LinkedIn:</strong> {form.linkedin}</li>}
        {form.portfolio && <li><strong>Portfolio:</strong> {form.portfolio}</li>}
      </ul>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// TEMPLATE 2 — Modern (left label, right content, dividers)
// ══════════════════════════════════════════════════════════════════════════
function Template2({ form }) {
  const skills = getSkills(form);
  const langs  = getLangs(form);
  const certs  = getCerts(form);

  const row = { display: "grid", gridTemplateColumns: "110px 1fr", gap: "10px", marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "10px" };
  const label = { fontWeight: "700", fontSize: "12px", color: "#222", paddingTop: "1px" };

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", color: "#222", background: "#fff", padding: "16mm 18mm", minHeight: "297mm", width: "210mm", boxSizing: "border-box" }}>
      {/* Header */}
      <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "2px" }}>{form.name || "Your Name"}</div>
      {form.headline && <div style={{ color: "#555", marginBottom: "6px" }}>{form.headline}</div>}
      <div style={{ borderBottom: "2px solid #2a9d8f", paddingBottom: "8px", marginBottom: "14px", color: "#555", fontSize: "11px" }}>
        {[form.email, form.phone, form.location, form.linkedin, form.portfolio].filter(Boolean).join("  |  ")}
      </div>

      {/* Summary */}
      {form.summary && <div style={row}><div style={label}>Summary</div><div style={{ color: "#444", lineHeight: 1.6 }}>{form.summary}</div></div>}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={row}>
          <div style={label}>Skills</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 16px" }}>
            {skills.map((s, i) => <div key={i}>• {s}</div>)}
          </div>
        </div>
      )}

      {/* Experience */}
      {form.experience?.some(e => e.company || e.role) && (
        <div style={row}>
          <div style={label}>Experience</div>
          <div>
            {form.experience.map((exp, i) => exp.company || exp.role ? (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div style={{ fontWeight: "700" }}>{exp.role}</div>
                <div style={{ color: "#555" }}>{exp.company}{exp.duration ? ` | ${exp.duration}` : ""}</div>
                {exp.description && <div style={{ color: "#444", marginTop: "2px" }}>{exp.description}</div>}
              </div>
            ) : null)}
          </div>
        </div>
      )}

      {/* Projects */}
      {form.projects?.some(p => p.name) && (
        <div style={row}>
          <div style={label}>Projects</div>
          <div>
            {form.projects.map((proj, i) => proj.name ? (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div style={{ fontWeight: "700" }}>{proj.name}{proj.tech ? <span style={{ fontWeight: 400, color: "#555" }}> ({proj.tech})</span> : ""}</div>
                {proj.description && <div style={{ color: "#444", marginTop: "2px" }}>{proj.description}</div>}
              </div>
            ) : null)}
          </div>
        </div>
      )}

      {/* Education */}
      {form.education?.some(e => e.institution || e.degree) && (
        <div style={row}>
          <div style={label}>Education and Training</div>
          <div>
            {form.education.map((edu, i) => edu.institution || edu.degree ? (
              <div key={i} style={{ marginBottom: "7px" }}>
                <div><strong>{edu.degree}</strong>{edu.year ? `, ${edu.year}` : ""}</div>
                <div style={{ color: "#555" }}><strong>{edu.institution}</strong>{edu.cgpa ? ` | ${edu.cgpa}` : ""}</div>
              </div>
            ) : null)}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certs.length > 0 && <div style={row}><div style={label}>Certifications</div><ul style={{ margin: 0, paddingLeft: "18px" }}>{certs.map((c, i) => <li key={i}>{c}</li>)}</ul></div>}

      {/* Languages */}
      {langs.length > 0 && <div style={row}><div style={label}>Languages</div><div>{langs.join(" · ")}</div></div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// TEMPLATE 3 — Split (left sidebar + right content)
// ══════════════════════════════════════════════════════════════════════════
function Template3({ form }) {
  const skills = getSkills(form);
  const langs  = getLangs(form);
  const certs  = getCerts(form);

  const sh = { fontWeight: "700", fontSize: "11px", borderLeft: "3px solid #333", paddingLeft: "6px", marginBottom: "5px", marginTop: "12px" };

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", color: "#222", background: "#fff", minHeight: "297mm", width: "210mm", boxSizing: "border-box", display: "flex" }}>
      {/* Left sidebar */}
      <div style={{ width: "170px", background: "#f4f4f4", padding: "16mm 12px", flexShrink: 0 }}>
        <div style={{ fontWeight: "700", fontSize: "11px", marginBottom: "4px", color: "#333" }}>Contact</div>
        {form.email    && <div style={{ color: "#555", fontSize: "11px", marginBottom: "2px" }}>{form.email}</div>}
        {form.phone    && <div style={{ color: "#555", fontSize: "11px", marginBottom: "2px" }}>{form.phone}</div>}
        {form.location && <div style={{ color: "#555", fontSize: "11px", marginBottom: "2px" }}>{form.location}</div>}
        {form.linkedin && <div style={{ color: "#555", fontSize: "11px", marginBottom: "2px" }}>{form.linkedin}</div>}
        {form.portfolio && <div style={{ color: "#555", fontSize: "11px", marginBottom: "10px" }}>{form.portfolio}</div>}

        {skills.length > 0 && (
          <>
            <div style={{ fontWeight: "700", fontSize: "11px", marginTop: "14px", marginBottom: "4px", color: "#333" }}>Skills</div>
            {skills.map((s, i) => <div key={i} style={{ fontSize: "11px", marginBottom: "2px" }}>• {s}</div>)}
          </>
        )}

        {langs.length > 0 && (
          <>
            <div style={{ fontWeight: "700", fontSize: "11px", marginTop: "14px", marginBottom: "4px", color: "#333" }}>Languages</div>
            <div style={{ fontSize: "11px", color: "#555" }}>{langs.join(", ")}</div>
          </>
        )}

        {certs.length > 0 && (
          <>
            <div style={{ fontWeight: "700", fontSize: "11px", marginTop: "14px", marginBottom: "4px", color: "#333" }}>Certifications</div>
            {certs.map((c, i) => <div key={i} style={{ fontSize: "11px", marginBottom: "2px" }}>• {c}</div>)}
          </>
        )}
      </div>

      {/* Right content */}
      <div style={{ flex: 1, padding: "16mm 16px" }}>
        <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "2px" }}>{form.name || "Your Name"}</div>
        {form.headline && <div style={{ color: "#555", marginBottom: "10px" }}>{form.headline}</div>}

        {form.summary && (
          <><div style={sh}>Summary</div><p style={{ margin: "0 0 8px", color: "#444", lineHeight: 1.6 }}>{form.summary}</p></>
        )}

        {form.experience?.some(e => e.company || e.role) && (
          <>
            <div style={sh}>Experience</div>
            {form.experience.map((exp, i) => exp.company || exp.role ? (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div style={{ fontWeight: "700" }}>{exp.company}{exp.role ? ` — ${exp.role}` : ""}</div>
                {exp.duration && <div style={{ color: "#777", fontSize: "11px", fontStyle: "italic" }}>{exp.duration}</div>}
                {exp.description && <div style={{ color: "#444", marginTop: "2px" }}>{exp.description}</div>}
              </div>
            ) : null)}
          </>
        )}

        {form.projects?.some(p => p.name) && (
          <>
            <div style={sh}>Projects</div>
            {form.projects.map((proj, i) => proj.name ? (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div style={{ fontWeight: "700" }}>{proj.name}{proj.tech ? <span style={{ fontWeight: 400, color: "#555" }}> ({proj.tech})</span> : ""}</div>
                {proj.description && <div style={{ color: "#444", marginTop: "2px" }}>{proj.description}</div>}
              </div>
            ) : null)}
          </>
        )}

        {form.education?.some(e => e.institution || e.degree) && (
          <>
            <div style={sh}>Education and Training</div>
            {form.education.map((edu, i) => edu.institution || edu.degree ? (
              <div key={i} style={{ marginBottom: "7px" }}>
                <div style={{ fontWeight: "700" }}>{edu.degree}{edu.year ? `, ${edu.year}` : ""}</div>
                <div style={{ color: "#555" }}><strong>{edu.institution}</strong>{edu.cgpa ? ` | ${edu.cgpa}` : ""}</div>
              </div>
            ) : null)}
          </>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// TEMPLATE PAGE — wraps the chosen template + download button
// ══════════════════════════════════════════════════════════════════════════
export default function TemplatePage({ form }) {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const previewRef = useRef(null);

  const templateId = parseInt(id);

  const renderTemplate = () => {
    if (templateId === 1) return <Template1 form={form} />;
    if (templateId === 2) return <Template2 form={form} />;
    if (templateId === 3) return <Template3 form={form} />;
    return <div>Template not found.</div>;
  };

  const templateNames = { 1: "Classic", 2: "Modern", 3: "Split" };

  const handleDownload = () => {
    const content  = previewRef.current.innerHTML;
    const win      = window.open("", "_blank");
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${form.name || "Resume"} — VitaeX</title>
          <style>
            @page { size: A4; margin: 0; }
            * { box-sizing: border-box; }
            body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F0EBE0" }}>
      <ParticleBackground />
      <NavBar />
      <div style={{ position: "relative", zIndex: 1, padding: "6rem 2rem 4rem" }}>

        {/* Top bar */}
        <div style={{
          maxWidth: "860px", margin: "0 auto 1.5rem",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "1rem",
        }}>
          <div>
            <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 400, color: WINE, fontSize: "1.4rem", margin: "0 0 3px" }}>
              {templateNames[templateId]} Template
            </h2>
            <p style={{ color: WINE_MUTED, fontSize: "0.82rem", margin: 0 }}>
              Looking good! Download as PDF when you're ready.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Btn outline small onClick={() => navigate("/templates")}>← Change Template</Btn>
            <Btn small onClick={handleDownload}>Download PDF</Btn>
          </div>
        </div>

        {/* Resume */}
        <div style={{ maxWidth: "860px", margin: "0 auto", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", borderRadius: "2px", overflowX: "auto" }}>
          <div ref={previewRef}>
            {renderTemplate()}
          </div>
        </div>

        <p style={{ textAlign: "center", color: WINE_MUTED, fontSize: "12px", marginTop: "1rem" }}>
          ✦ &nbsp; Use Download PDF or Ctrl+P / Cmd+P to save &nbsp; ✦
        </p>
      </div>
    </div>
  );
}