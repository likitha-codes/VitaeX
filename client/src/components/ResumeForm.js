// VitaeX/client/src/components/ResumeForm.js

import { IS, LS, WINE_MUTED, BEIGE_BORDER } from "./styles/constants";
import SectionTitle from "./SectionTitle";
import Btn from "./Btn";

function F({ label, children }) {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <label style={LS}>{label}</label>
      {children}
    </div>
  );
}

export default function ResumeForm({ form, setForm, onGenerate, onBack }) {
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const updArr = (key, i, field, val) => {
    const arr = [...form[key]];
    arr[i] = { ...arr[i], [field]: val };
    set(key, arr);
  };

  const addItem    = (key, blank) => set(key, [...form[key], blank]);
  const removeItem = (key, i)     => set(key, form[key].filter((_, idx) => idx !== i));

  const cardStyle = {
    background:    "#fff",
    border:        `1px solid ${BEIGE_BORDER}`,
    borderRadius:  "3px",
    padding:       "1.2rem",
    marginBottom:  "1rem",
    position:      "relative",
  };

  const addBtn = (label, onClick) => (
    <button
      onClick={onClick}
      style={{
        background:   "transparent",
        border:       `1px dashed ${WINE_MUTED}`,
        color:        WINE_MUTED,
        padding:      "0.5rem 1.2rem",
        cursor:       "pointer",
        fontSize:     "0.85rem",
        fontFamily:   "Georgia, serif",
        borderRadius: "2px",
        marginBottom: "0.5rem",
      }}
    >
      {label}
    </button>
  );

  const rmBtn = (key, i) =>
    form[key].length > 1 && (
      <button
        onClick={() => removeItem(key, i)}
        style={{
          position:   "absolute",
          top:        "0.8rem",
          right:      "0.8rem",
          background: "transparent",
          border:     "none",
          cursor:     "pointer",
          color:      WINE_MUTED,
          fontSize:   "18px",
          lineHeight: 1,
        }}
      >
        ×
      </button>
    );

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "6rem 2rem 4rem" }}>
      <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 400, color: "#7B2D42", fontSize: "1.8rem", marginBottom: "0.3rem" }}>
        Build Your Resume
      </h2>
      <p style={{ color: "#6B4A55", fontSize: "0.9rem", marginBottom: 0 }}>
        Fill in the details below. Everything you enter will appear in your resume.
      </p>

      {/* Personal Info */}
      <SectionTitle>Personal Info</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.2rem" }}>
        <F label="Full Name">
          <input style={IS} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Enter your full name" />
        </F>
        <F label="Headline / Role">
          <input style={IS} value={form.headline} onChange={e => set("headline", e.target.value)} placeholder="e.g. Software Engineer" />
        </F>
        <F label="Email">
          <input style={IS} value={form.email} onChange={e => set("email", e.target.value)} placeholder="Enter your email address" />
        </F>
        <F label="Phone">
          <input style={IS} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="Enter your phone number" />
        </F>
        <F label="Location">
          <input style={IS} value={form.location} onChange={e => set("location", e.target.value)} placeholder="City, State" />
        </F>
        <F label="LinkedIn (optional)">
          <input style={IS} value={form.linkedin} onChange={e => set("linkedin", e.target.value)} placeholder="Your LinkedIn URL" />
        </F>
        <F label="Portfolio / GitHub (optional)">
          <input style={IS} value={form.portfolio} onChange={e => set("portfolio", e.target.value)} placeholder="Your portfolio or GitHub URL" />
        </F>
      </div>

      {/* Summary */}
      <SectionTitle>Professional Summary</SectionTitle>
      <F label="Summary">
        <textarea
          style={{ ...IS, minHeight: "100px", resize: "vertical" }}
          value={form.summary}
          onChange={e => set("summary", e.target.value)}
          placeholder="Write a short professional summary..."
        />
      </F>

      {/* Experience */}
      <SectionTitle>Professional Experience</SectionTitle>
      {form.experience.map((exp, i) => (
        <div key={i} style={cardStyle}>
          {rmBtn("experience", i)}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.2rem" }}>
            <F label="Company / Organisation">
              <input style={IS} value={exp.company} onChange={e => updArr("experience", i, "company", e.target.value)} placeholder="Enter company or organisation name" />
            </F>
            <F label="Role / Title">
              <input style={IS} value={exp.role} onChange={e => updArr("experience", i, "role", e.target.value)} placeholder="Enter your job title" />
            </F>
            <F label="Duration">
              <input style={IS} value={exp.duration} onChange={e => updArr("experience", i, "duration", e.target.value)} placeholder="e.g. Jan 2023 – Present" />
            </F>
          </div>
          <F label="Description">
            <textarea
              style={{ ...IS, minHeight: "80px", resize: "vertical" }}
              value={exp.description}
              onChange={e => updArr("experience", i, "description", e.target.value)}
              placeholder="Describe your role and impact..."
            />
          </F>
        </div>
      ))}
      {addBtn("+ Add Experience", () => addItem("experience", { company: "", role: "", duration: "", description: "" }))}

      {/* Skills */}
      <SectionTitle>Skills</SectionTitle>
      <div style={{ marginBottom: "1.2rem" }}>
        <label style={LS}>Skills</label>
        {form.skills.map((skill, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontSize: "18px", lineHeight: 1, color: "#333" }}>•</span>
            <input
              style={{ ...IS, flex: 1 }}
              value={skill}
              onChange={e => {
                const arr = [...form.skills];
                arr[i] = e.target.value;
                set("skills", arr);
              }}
              placeholder="Enter a skill"
            />
            {form.skills.length > 1 && (
              <button
                onClick={() => set("skills", form.skills.filter((_, idx) => idx !== i))}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: WINE_MUTED, fontSize: "18px", lineHeight: 1, padding: "0 4px" }}
              >
                ×
              </button>
            )}
          </div>
        ))}
        {addBtn("+ Add Skill", () => set("skills", [...form.skills, ""]))}
      </div>

      {/* Education */}
      <SectionTitle>Education</SectionTitle>
      {form.education.map((edu, i) => (
        <div key={i} style={cardStyle}>
          {rmBtn("education", i)}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.2rem" }}>
            <F label="Institution">
              <input style={IS} value={edu.institution} onChange={e => updArr("education", i, "institution", e.target.value)} placeholder="Enter your school or university" />
            </F>
            <F label="Degree / Level">
              <input style={IS} value={edu.degree} onChange={e => updArr("education", i, "degree", e.target.value)} placeholder="e.g. Bachelor of Engineering" />
            </F>
            <F label="Year / Duration">
              <input style={IS} value={edu.year} onChange={e => updArr("education", i, "year", e.target.value)} placeholder="e.g. 2021 – 2025" />
            </F>
            <F label="CGPA / Percentage (optional)">
              <input style={IS} value={edu.cgpa} onChange={e => updArr("education", i, "cgpa", e.target.value)} placeholder="e.g. 8.5 / 10 or 85%" />
            </F>
          </div>
        </div>
      ))}
      {addBtn("+ Add Education", () => addItem("education", { institution: "", degree: "", year: "", cgpa: "" }))}

      {/* Projects */}
      <SectionTitle>Projects</SectionTitle>
      {form.projects.map((proj, i) => (
        <div key={i} style={cardStyle}>
          {rmBtn("projects", i)}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.2rem" }}>
            <F label="Project Name">
              <input style={IS} value={proj.name} onChange={e => updArr("projects", i, "name", e.target.value)} placeholder="Enter your project name" />
            </F>
            <F label="Technologies Used">
              <input style={IS} value={proj.tech} onChange={e => updArr("projects", i, "tech", e.target.value)} placeholder="e.g. Python, TensorFlow, React" />
            </F>
          </div>
          <F label="Description">
            <textarea
              style={{ ...IS, minHeight: "70px", resize: "vertical" }}
              value={proj.description}
              onChange={e => updArr("projects", i, "description", e.target.value)}
              placeholder="What did you build and what problem did it solve?"
            />
          </F>
        </div>
      ))}
      {addBtn("+ Add Project", () => addItem("projects", { name: "", description: "", tech: "" }))}

      {/* Other */}
      <SectionTitle>Other</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.2rem" }}>
        <F label="Certifications">
          <textarea
            style={{ ...IS, minHeight: "70px", resize: "vertical" }}
            value={form.certifications}
            onChange={e => set("certifications", e.target.value)}
            placeholder="Enter your certifications, one per line"
          />
        </F>
        <F label="Languages">
          <textarea
            style={{ ...IS, minHeight: "70px", resize: "vertical" }}
            value={form.languages}
            onChange={e => set("languages", e.target.value)}
            placeholder="e.g. English, Telugu, Hindi"
          />
        </F>
      </div>

      {/* Actions */}
      <div style={{
        display:        "flex",
        justifyContent: "flex-end",
        gap:            "1rem",
        marginTop:      "2.5rem",
        paddingTop:     "1.5rem",
        borderTop:      `1px solid ${BEIGE_BORDER}`,
      }}>
        <Btn outline onClick={onBack}>Back</Btn>
        <Btn onClick={() => onGenerate(form)}>Generate Resume →</Btn>
      </div>
    </div>
  );
}