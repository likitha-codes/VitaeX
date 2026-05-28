// VitaeX/client/src/components/LivePreview.js
// A4 resume preview — black & white, 2-column skills, bullet points, CGPA

import { forwardRef } from "react";

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
  divider:     { border: "none", borderTop: "2.5px solid #111", margin: "6px 0 10px",},
    sectionHead: {
    fontSize:      "11px",
    fontWeight:    "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    margin:        "14px 0 4px",
    color:         "#111",
  },
  thinDiv: { border: "none", borderTop: "0.8px solid #bbb", margin: "0 0 6px" },
  bold:    { fontWeight: "700", fontSize: "13px", margin: "0 0 2px" },
};

const LivePreview = forwardRef(function LivePreview({ data }, ref) {
  const skills = Array.isArray(data.skills)
    ? data.skills.filter(Boolean)
    : (data.skills ? data.skills.split(",").map(s => s.trim()).filter(Boolean) : []);

  const certs = data.certifications
    ? data.certifications.split("\n").filter(Boolean)
    : [];

  const langs = data.languages
    ? data.languages.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div ref={ref} style={rs.page}>

      {/* Header */}
      <p style={rs.name}>{data.name || "Your Name"}</p>
      {data.headline && <p style={rs.headline}>{data.headline}</p>}
      <hr style={rs.divider} />

      {/* Summary */}
      {data.summary && (
        <>
          <p style={rs.sectionHead}>Professional Summary</p>
          <hr style={rs.divider} />
          <p style={{ margin: "0 0 6px" }}>{data.summary}</p>
        </>
      )}

      {/* Experience */}
      {data.experience?.some(e => e.company ||e.role) &&(
        <>
        <p style={rs.sectionHead}>Professional Experience</p>
        <hr style={rs.divider} />
        {data.experience.map((exp, i) =>
          exp.company || exp.role ? (
            <div key={i} style={{ marginBottom: "10px" }}>
              <p style={rs.bold}>
                {exp.role}
                {exp.company ? ` at ${exp.company}` : ""}

                {exp.duration && (
                  <span style={{ fontWeight: 400, color: "#555" }}>
                    {" "} | {exp.duration}
                  </span>
                )}
              </p>
              {exp.description &&(
                <p style={{margin:"4px 0 0", color: "#333", lineHeight:1.6}}>
                  {exp.description}
                </p>
              )}
              {i!== data.experience.length -1 && (
                <hr style={rs.thinDiv}/>
              )}
            </div>
          ) : null
        )}
        </>
      )}

      {/* Projects */}
      {data.projects?.some(p => p.name) && (
        <>
          <p style={rs.sectionHead}>Projects</p>
          <hr style={rs.divider} />
          {data.projects.map((proj, i) =>
            proj.name ? (
              <div key={i} style={{ marginBottom: "8px" }}>
                <p style={rs.bold}>
                  {proj.name}
                  {proj.tech && (
                    <span style={{ fontWeight: 400, color: "#555" }}>
                      {" "} | {proj.tech}
                    </span>
                  )}
                </p>
                {proj.description && (
                  <p style={{ margin: "2px 0 0", color: "#333" }}>
                    {proj.description}</p> )}
                {i !==data.projects.length-1 && (
                  <hr style={rs.thinDiv}/>
                )}
              </div>
            ) : null
          )}
        </>
      )}

      {/* Skills — 2 columns, black bullets */}
      {skills.length > 0 && (
        <>
          <p style={rs.sectionHead}>Skills</p>
          <hr style={rs.divider} />
          <div style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "2px 24px",
            marginBottom:        "6px",
          }}>
            {skills.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "16px", lineHeight: 1, color: "#111" }}>•</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Education */}
      {data.education?.some(e => e.institution || e.degree) && (
        <>
          <p style={rs.sectionHead}>Education</p>
          <hr style={rs.divider} />
          {data.education.map((edu, i) =>
            edu.institution || edu.degree ? (
              <div key={i} style={{ marginBottom: "7px" }}>
                <p style={rs.bold}>{edu.degree}</p>
                <p style={{ margin: 0, color: "#333" }}>
                  {edu.institution}
                  {edu.year ? ` (${edu.year})` : ""}
                  {edu.cgpa ? ` — ${edu.cgpa}` : ""}
                </p>

                {i !== data.education.length - 1 && <hr style={rs.thinDiv} />}
              </div>
            ) : null
          )}
        </>
      )}

      {/* Certifications */}
      {certs.length > 0 && (
        <>
          <p style={rs.sectionHead}>Certifications</p>
          <hr style={rs.divider} />
          <ul style={{ margin: "0 0 6px", paddingLeft: "18px" }}>
            {certs.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </>
      )}

      {/* Languages */}
      {langs.length > 0 && (
        <>
          <p style={rs.sectionHead}>Languages</p>
          <hr style={rs.divider} />
          <p style={{ margin: 0 }}>{langs.join(" · ")}</p>
        </>
      )}

      {/* Contact */}
      <p style={rs.sectionHead}>Contact Information</p>
      <hr style={rs.divider} />
      <ul style={{ margin: 0, paddingLeft: "18px" }}>
        {data.phone    && <li><strong>Phone:</strong> {data.phone}</li>}
        {data.email    && <li><strong>Email:</strong> {data.email}</li>}
        {data.location && <li><strong>Location:</strong> {data.location}</li>}
        {data.linkedin && <li><strong>LinkedIn:</strong> {data.linkedin}</li>}
        {data.portfolio && <li><strong>Portfolio:</strong> {data.portfolio}</li>}
      </ul>
    </div>
  );
});

export default LivePreview;