import { useState, useEffect, useRef } from "react";

const WINE = "#7B2D42";
const WINE_LIGHT = "#9E3D57";
const WINE_MUTED = "#C4768A";
const BEIGE = "#F0EBE0";
const BEIGE_DARK = "#E6DFD2";
const BEIGE_BORDER = "#D0C8B8";
const TEXT_DARK = "#1C1008";
const TEXT_MID = "#6B4A55";
const LOGO_SRC = "data:image/png;base64,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";

// ─── Particle Background ───────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const NUM = 50;
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 2.5 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.35 + 0.08,
    }));
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(123,45,66,${0.1 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123,45,66,${p.opacity})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0 }} />;
}

// ─── Logo ──────────────────────────────────────────────────────────────────
function Logo({ size = 80 }) {
  return <img src={LOGO_SRC} alt="VitaeX" style={{ width: size, height: "auto", display:"block" }} />;
}

// ─── Shared Button ─────────────────────────────────────────────────────────
function Btn({ children, onClick, outline = false, small = false }) {
  const [hov, setHov] = useState(false);
  const base = {
    padding: small ? "0.55rem 1.4rem" : "0.9rem 2.2rem",
    fontSize: small ? "0.82rem" : "0.9rem",
    letterSpacing: "2px", textTransform: "uppercase",
    fontFamily: "'Georgia', serif", borderRadius: "1px",
    cursor: "pointer", transition: "all 0.2s",
    transform: hov ? "translateY(-2px)" : "translateY(0)",
  };
  const filled = { ...base, background: hov ? WINE_LIGHT : WINE, color: BEIGE, border: "none" };
  const outl   = { ...base, background: hov ? BEIGE_DARK : "transparent", color: WINE, border: `1.5px solid ${WINE}` };
  return (
    <button style={outline ? outl : filled} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  );
}

// ─── Nav bar shown on all pages except home ────────────────────────────────
function NavBar({ onHome }) {
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: `${BEIGE}ee`, backdropFilter:"blur(8px)",
      borderBottom:`1px solid ${BEIGE_BORDER}`,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0.6rem 2.5rem" }}>
      <div onClick={onHome} style={{ cursor:"pointer" }}>
        <Logo size={48} />
      </div>
      <span style={{ fontSize:"11px", letterSpacing:"3px", color:WINE_MUTED, textTransform:"uppercase" }}>
        Resume Optimiser
      </span>
    </div>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────
function HomePage({ onBuild, onUpload }) {
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"center",minHeight:"100vh",padding:"2rem",textAlign:"center" }}>
      <Logo size={110} />
      <div style={{ height:"1.2rem" }} />
      <div style={{ fontSize:"11px",letterSpacing:"5px",color:WINE_MUTED,textTransform:"uppercase",
        fontFamily:"Georgia,serif", marginBottom:"0.5rem" }}>
        Resume Optimiser
      </div>
      <p style={{ fontSize:"1rem",color:TEXT_MID,maxWidth:"420px",lineHeight:1.8,
        margin:"0 0 2.8rem", fontFamily:"Georgia,serif" }}>
        Build a polished resume from scratch, or upload yours for a deep analysis.
      </p>
      <div style={{ display:"flex", gap:"1.2rem", flexWrap:"wrap", justifyContent:"center" }}>
        <Btn onClick={onBuild}>Build Resume</Btn>
        <Btn onClick={onUpload} outline>Upload Resume</Btn>
      </div>
      <p style={{ marginTop:"3rem",fontSize:"11px",color:WINE_MUTED,letterSpacing:"1px" }}>✦ &nbsp; Private &amp; Secure &nbsp; ✦</p>
    </div>
  );
}

// ─── FORM PAGE ─────────────────────────────────────────────────────────────
const IS = {
  width:"100%", padding:"0.6rem 0.8rem",
  background:"#fff", border:`1px solid ${BEIGE_BORDER}`,
  borderRadius:"2px", fontSize:"0.92rem", color:TEXT_DARK,
  fontFamily:"Georgia,serif", outline:"none", boxSizing:"border-box",
};
const LS = { display:"block", fontSize:"10px", letterSpacing:"2.5px",
  textTransform:"uppercase", color:WINE_MUTED, marginBottom:"5px", fontFamily:"Georgia,serif" };

function F({ label, children }) {
  return <div style={{ marginBottom:"1.2rem" }}><label style={LS}>{label}</label>{children}</div>;
}

function SectionTitle({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"1rem", margin:"2rem 0 1.2rem" }}>
      <span style={{ fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase",
        color:WINE, fontFamily:"Georgia,serif", whiteSpace:"nowrap" }}>{children}</span>
      <div style={{ flex:1, height:"1px", background:BEIGE_BORDER }} />
    </div>
  );
}

function ResumeForm({ onGenerate, onBack }) {
  const [form, setForm] = useState({
    name:"", email:"", phone:"", location:"", linkedin:"", portfolio:"",
    headline:"", summary:"", skills:[""],
    experience:[{ company:"", role:"", duration:"", description:"" }],
    education:[{ institution:"", degree:"", year:"" }],
    projects:[{ name:"", description:"", tech:"" }],
    certifications:"", languages:"",
  });

  const set = (k,v) => setForm(f => ({ ...f, [k]:v }));

  const updArr = (key, i, field, val) => {
    const arr = [...form[key]];
    arr[i] = { ...arr[i], [field]: val };
    set(key, arr);
  };
  const addItem = (key, blank) => set(key, [...form[key], blank]);
  const removeItem = (key, i) => set(key, form[key].filter((_,idx)=>idx!==i));

  const cardStyle = {
    background:"#fff", border:`1px solid ${BEIGE_BORDER}`,
    borderRadius:"3px", padding:"1.2rem", marginBottom:"1rem",
    position:"relative",
  };
  const rmBtn = (key,i) => (
    form[key].length > 1 &&
    <button onClick={() => removeItem(key,i)} style={{
      position:"absolute", top:"0.8rem", right:"0.8rem",
      background:"transparent", border:"none", cursor:"pointer",
      color:WINE_MUTED, fontSize:"18px", lineHeight:1 }}>×</button>
  );

  return (
    <div style={{ maxWidth:"720px", margin:"0 auto", padding:"6rem 2rem 4rem" }}>
      <h2 style={{ fontFamily:"Georgia,serif", fontWeight:400, color:WINE,
        fontSize:"1.8rem", marginBottom:"0.3rem" }}>Build Your Resume</h2>
      <p style={{ color:TEXT_MID, fontSize:"0.9rem", marginBottom:"0" }}>
        Fill in the details below. Everything you enter will appear in your resume.
      </p>

      <SectionTitle>Personal Info</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1.2rem" }}>
        <F label="Full Name"><input style={IS} value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Enter your full name" /></F>
        <F label="Headline / Role"><input style={IS} value={form.headline} onChange={e=>set("headline",e.target.value)} placeholder="e.g. Software Engineer" /></F>
        <F label="Email"><input style={IS} value={form.email} onChange={e=>set("email",e.target.value)} placeholder="Enter your email address" /></F>
        <F label="Phone"><input style={IS} value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="Enter your phone number" /></F>
        <F label="Location"><input style={IS} value={form.location} onChange={e=>set("location",e.target.value)} placeholder="City, State" /></F>
        <F label="LinkedIn (optional)"><input style={IS} value={form.linkedin} onChange={e=>set("linkedin",e.target.value)} placeholder="Your LinkedIn URL" /></F>
        <F label="Portfolio / GitHub (optional)" ><input style={IS} value={form.portfolio} onChange={e=>set("portfolio",e.target.value)} placeholder="Your portfolio or GitHub URL" /></F>
      </div>

      <SectionTitle>Professional Summary</SectionTitle>
      <F label="Summary">
        <textarea style={{ ...IS, minHeight:"100px", resize:"vertical" }}
          value={form.summary} onChange={e=>set("summary",e.target.value)}
          placeholder="I am passionate about..." />
      </F>

      <SectionTitle>Professional Experience</SectionTitle>
      {form.experience.map((exp,i) => (
        <div key={i} style={cardStyle}>
          {rmBtn("experience",i)}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1.2rem" }}>
            <F label="Company / Organisation"><input style={IS} value={exp.company} onChange={e=>updArr("experience",i,"company",e.target.value)} placeholder="Enter company or organisation name" /></F>
            <F label="Role / Title"><input style={IS} value={exp.role} onChange={e=>updArr("experience",i,"role",e.target.value)} placeholder="Enter your job title" /></F>
            <F label="Duration"><input style={IS} value={exp.duration} onChange={e=>updArr("experience",i,"duration",e.target.value)} placeholder="e.g. Jan 2023 – Present" /></F>
          </div>
          <F label="Description">
            <textarea style={{ ...IS, minHeight:"80px", resize:"vertical" }}
              value={exp.description} onChange={e=>updArr("experience",i,"description",e.target.value)}
              placeholder="Describe your role and impact..." />
          </F>
        </div>
      ))}
      <button onClick={() => addItem("experience",{ company:"",role:"",duration:"",description:"" })}
        style={{ background:"transparent", border:`1px dashed ${WINE_MUTED}`, color:WINE_MUTED,
          padding:"0.5rem 1.2rem", cursor:"pointer", fontSize:"0.85rem",
          fontFamily:"Georgia,serif", borderRadius:"2px", marginBottom:"0.5rem" }}>
        + Add Experience
      </button>

      <SectionTitle>Skills</SectionTitle>
      <div style={{ marginBottom:"1.2rem" }}>
        <label style={LS}>Skills</label>
        {form.skills.map((skill, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
            <span style={{ color:WINE_MUTED, fontSize:"18px", lineHeight:1, paddingBottom:"2px" }}>•</span>
            <input
              style={{ ...IS, flex:1 }}
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
                onClick={() => set("skills", form.skills.filter((_,idx) => idx !== i))}
                style={{ background:"transparent", border:"none", cursor:"pointer",
                  color:WINE_MUTED, fontSize:"18px", lineHeight:1, padding:"0 4px" }}>
                ×
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => set("skills", [...form.skills, ""])}
          style={{ background:"transparent", border:`1px dashed ${WINE_MUTED}`, color:WINE_MUTED,
            padding:"0.4rem 1rem", cursor:"pointer", fontSize:"0.82rem",
            fontFamily:"Georgia,serif", borderRadius:"2px", marginTop:"2px" }}>
          + Add Skill
        </button>
      </div>

      <SectionTitle>Education</SectionTitle>
      {form.education.map((edu,i) => (
        <div key={i} style={cardStyle}>
          {rmBtn("education",i)}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1.2rem" }}>
            <F label="Institution"><input style={IS} value={edu.institution} onChange={e=>updArr("education",i,"institution",e.target.value)} placeholder="Enter your school or university" /></F>
            <F label="Degree / Level"><input style={IS} value={edu.degree} onChange={e=>updArr("education",i,"degree",e.target.value)} placeholder="e.g. Bachelor of Engineering" /></F>
            <F label="Year / Duration"><input style={IS} value={edu.year} onChange={e=>updArr("education",i,"year",e.target.value)} placeholder="e.g. 2021 – 2025" /></F>
          </div>
        </div>
      ))}
      <button onClick={() => addItem("education",{ institution:"",degree:"",year:"" })}
        style={{ background:"transparent", border:`1px dashed ${WINE_MUTED}`, color:WINE_MUTED,
          padding:"0.5rem 1.2rem", cursor:"pointer", fontSize:"0.85rem",
          fontFamily:"Georgia,serif", borderRadius:"2px", marginBottom:"0.5rem" }}>
        + Add Education
      </button>

      <SectionTitle>Projects</SectionTitle>
      {form.projects.map((proj,i) => (
        <div key={i} style={cardStyle}>
          {rmBtn("projects",i)}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1.2rem" }}>
            <F label="Project Name"><input style={IS} value={proj.name} onChange={e=>updArr("projects",i,"name",e.target.value)} placeholder="Enter your project name" /></F>
            <F label="Technologies Used"><input style={IS} value={proj.tech} onChange={e=>updArr("projects",i,"tech",e.target.value)} placeholder="e.g. Python, TensorFlow, React" /></F>
          </div>
          <F label="Description">
            <textarea style={{ ...IS, minHeight:"70px", resize:"vertical" }}
              value={proj.description} onChange={e=>updArr("projects",i,"description",e.target.value)}
              placeholder="What did you build and what problem did it solve?" />
          </F>
        </div>
      ))}
      <button onClick={() => addItem("projects",{ name:"",description:"",tech:"" })}
        style={{ background:"transparent", border:`1px dashed ${WINE_MUTED}`, color:WINE_MUTED,
          padding:"0.5rem 1.2rem", cursor:"pointer", fontSize:"0.85rem",
          fontFamily:"Georgia,serif", borderRadius:"2px", marginBottom:"0.5rem" }}>
        + Add Project
      </button>

      <SectionTitle>Other</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1.2rem" }}>
        <F label="Certifications">
          <textarea style={{ ...IS, minHeight:"70px", resize:"vertical" }}
            value={form.certifications} onChange={e=>set("certifications",e.target.value)}
            placeholder="Enter your certifications, one per line" />
        </F>
        <F label="Languages">
          <textarea style={{ ...IS, minHeight:"70px", resize:"vertical" }}
            value={form.languages} onChange={e=>set("languages",e.target.value)}
            placeholder="e.g. English, Telugu, Hindi" />
        </F>
      </div>

      <div style={{ display:"flex", justifyContent:"flex-end", gap:"1rem", marginTop:"2.5rem", paddingTop:"1.5rem",
        borderTop:`1px solid ${BEIGE_BORDER}` }}>
        <Btn outline onClick={onBack}>Back</Btn>
        <Btn onClick={() => onGenerate(form)}>Generate Resume →</Btn>
      </div>
    </div>
  );
}

// ─── RESUME PREVIEW ────────────────────────────────────────────────────────
function ResumePage({ data, onAnalyse, onBack }) {
  const rs = {
    page:{ maxWidth:"680px", margin:"0 auto", background:"#fff",
      padding:"2.5rem 2.8rem", fontFamily:"Arial,Helvetica,sans-serif",
      color:"#111", fontSize:"13px", lineHeight:"1.5" },
    name:{ fontSize:"22px", fontWeight:"700", margin:"0 0 2px" },
    headline:{ fontSize:"13px", fontWeight:"400", color:"#333", margin:"0 0 12px" },
    divider:{ border:"none", borderTop:"1.5px solid #333", margin:"8px 0" },
    sectionHead:{ fontSize:"11.5px", fontWeight:"700", letterSpacing:"1px",
      textTransform:"uppercase", margin:"14px 0 5px", color:"#111" },
    thinDiv:{ border:"none", borderTop:"0.8px solid #bbb", margin:"3px 0 8px" },
    bold:{ fontWeight:"700", fontSize:"13px" },
    normal:{ fontWeight:"400" },
  };

  const skills = Array.isArray(data.skills)
    ? data.skills.filter(Boolean)
    : (data.skills ? data.skills.split(",").map(s=>s.trim()).filter(Boolean) : []);
  const certs  = data.certifications ? data.certifications.split("\n").filter(Boolean) : [];
  const langs  = data.languages ? data.languages.split(",").map(s=>s.trim()).filter(Boolean) : [];

  return (
    <div style={{ maxWidth:"820px", margin:"0 auto", padding:"6rem 2rem 4rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
        <h2 style={{ fontFamily:"Georgia,serif", fontWeight:400, color:WINE, fontSize:"1.4rem", margin:0 }}>
          Your Resume
        </h2>
        <div style={{ display:"flex", gap:"1rem" }}>
          <Btn outline small onClick={onBack}>← Edit</Btn>
          <Btn small onClick={onAnalyse}>Analyse Resume</Btn>
        </div>
      </div>

      <div style={{ boxShadow:"0 4px 32px rgba(0,0,0,0.10)", borderRadius:"2px" }}>
        <div style={rs.page}>
          <p style={rs.name}>{data.name || "Your Name"}</p>
          <p style={rs.headline}>{data.headline || ""}</p>
          <hr style={rs.divider} />

          {data.summary && <>
            <p style={rs.sectionHead}>Professional Summary</p>
            <hr style={rs.thinDiv} />
            <p style={{ margin:"0 0 6px" }}>{data.summary}</p>
          </>}

          {data.experience.some(e=>e.company||e.role) && <>
            <p style={rs.sectionHead}>Professional Experience</p>
            <hr style={rs.thinDiv} />
            {data.experience.map((exp,i) => exp.company || exp.role ? (
              <div key={i} style={{ marginBottom:"10px" }}>
                <p style={{ ...rs.bold, margin:"0 0 1px" }}>{exp.role}{exp.company ? ` — ${exp.company}` : ""}{exp.duration ? <span style={{ fontWeight:400, color:"#555" }}> &nbsp;|&nbsp; {exp.duration}</span>:""}</p>
                {exp.description && <p style={{ margin:"2px 0 0", color:"#333" }}>{exp.description}</p>}
              </div>
            ):null)}
          </>}

          {data.projects.some(p=>p.name) && <>
            <p style={rs.sectionHead}>Projects</p>
            <hr style={rs.thinDiv} />
            {data.projects.map((proj,i) => proj.name ? (
              <div key={i} style={{ marginBottom:"8px" }}>
                <p style={{ ...rs.bold, margin:"0 0 1px" }}>{proj.name}{proj.tech ? <span style={{ fontWeight:400, color:"#555" }}> ({proj.tech})</span> : ""}</p>
                {proj.description && <p style={{ margin:"2px 0 0", color:"#333" }}>{proj.description}</p>}
              </div>
            ):null)}
          </>}

          {skills.length > 0 && <>
            <p style={rs.sectionHead}>Skills</p>
            <hr style={rs.thinDiv} />
            <ul style={{ margin:"0 0 6px", paddingLeft:"18px" }}>
              {skills.map((s,i) => <li key={i} style={{ marginBottom:"2px" }}>{s}</li>)}
            </ul>
          </>}

          {data.education.some(e=>e.institution||e.degree) && <>
            <p style={rs.sectionHead}>Education</p>
            <hr style={rs.thinDiv} />
            {data.education.map((edu,i) => edu.institution||edu.degree ? (
              <div key={i} style={{ marginBottom:"7px" }}>
                <p style={{ ...rs.bold, margin:"0 0 1px" }}>{edu.degree}</p>
                <p style={{ margin:0, color:"#333" }}>{edu.institution}{edu.year ? ` (${edu.year})`:""}</p>
              </div>
            ):null)}
          </>}

          {certs.length > 0 && <>
            <p style={rs.sectionHead}>Certifications</p>
            <hr style={rs.thinDiv} />
            <ul style={{ margin:"0 0 6px", paddingLeft:"18px" }}>
              {certs.map((c,i) => <li key={i}>{c}</li>)}
            </ul>
          </>}

          {langs.length > 0 && <>
            <p style={rs.sectionHead}>Languages</p>
            <hr style={rs.thinDiv} />
            <p style={{ margin:0 }}>{langs.join(" · ")}</p>
          </>}

          <p style={rs.sectionHead}>Contact Information</p>
          <hr style={rs.thinDiv} />
          <ul style={{ margin:0, paddingLeft:"18px" }}>
            {data.phone    && <li><strong>Phone:</strong> {data.phone}</li>}
            {data.email    && <li><strong>Email:</strong> {data.email}</li>}
            {data.location && <li><strong>Location:</strong> {data.location}</li>}
            {data.linkedin && <li><strong>LinkedIn:</strong> {data.linkedin}</li>}
            {data.portfolio && <li><strong>Portfolio:</strong> {data.portfolio}</li>}
          </ul>
        </div>
      </div>

      <p style={{ textAlign:"center", color:WINE_MUTED, fontSize:"12px", marginTop:"1rem" }}>
        ✦ &nbsp; Use Ctrl+P / Cmd+P to print or save as PDF &nbsp; ✦
      </p>
    </div>
  );
}

// ─── UPLOAD PAGE ───────────────────────────────────────────────────────────
function UploadPage({ onAnalyse, onBack }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleFile = (f) => {
    if (f && f.type === "application/pdf") setFile(f);
    else alert("Please upload a PDF file.");
  };

  const onDrop = (e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); };

  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"center",minHeight:"100vh",padding:"6rem 2rem 4rem" }}>
      <div style={{ maxWidth:"520px", width:"100%", textAlign:"center" }}>
        <h2 style={{ fontFamily:"Georgia,serif",fontWeight:400,color:WINE,fontSize:"1.8rem",marginBottom:"0.3rem" }}>
          Upload Your Resume
        </h2>
        <p style={{ color:TEXT_MID,fontSize:"0.9rem",marginBottom:"2rem" }}>
          PDF format only. Your resume will be analysed for improvements.
        </p>

        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e)=>{ e.preventDefault(); setDragging(true); }}
          onDragLeave={()=>setDragging(false)}
          onDrop={onDrop}
          style={{
            border:`2px dashed ${dragging ? WINE : BEIGE_BORDER}`,
            borderRadius:"4px", padding:"3rem 2rem",
            cursor:"pointer", transition:"all 0.2s",
            background: dragging ? `${WINE}08` : "#fff",
            marginBottom:"1.5rem",
          }}>
          <div style={{ fontSize:"2.5rem", marginBottom:"0.8rem" }}>📄</div>
          {file
            ? <p style={{ color:WINE, fontFamily:"Georgia,serif", margin:0 }}>✓ {file.name}</p>
            : <>
                <p style={{ color:TEXT_MID,fontFamily:"Georgia,serif",margin:"0 0 6px" }}>
                  Drag &amp; drop your PDF here
                </p>
                <p style={{ color:WINE_MUTED,fontSize:"0.82rem",margin:0 }}>or click to browse</p>
              </>}
          <input ref={inputRef} type="file" accept=".pdf" style={{ display:"none" }}
            onChange={e=>handleFile(e.target.files[0])} />
        </div>

        <div style={{ display:"flex", gap:"1rem", justifyContent:"center" }}>
          <Btn outline onClick={onBack}>← Back</Btn>
          <Btn onClick={() => file && onAnalyse(file)} outline={!file}>
            {file ? "Analyse Resume" : "Select a PDF first"}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ─── ANALYSE PAGE — connected to backend ──────────────────────────────────
function AnalysePage({ source, resumeData, onBack }) {
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyse = async () => {
    if (!jobTitle.trim()) {
      setError("Please enter a target job title.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      // Build payload from resume form data
      const skills = Array.isArray(resumeData?.skills)
        ? resumeData.skills.filter(Boolean).join(", ")
        : resumeData?.skills || "";

      const experience = resumeData?.experience
        ?.map(e => `${e.role} at ${e.company} (${e.duration}): ${e.description}`)
        .filter(Boolean).join(" | ") || "";

      const education = resumeData?.education
        ?.map(e => `${e.degree} from ${e.institution} (${e.year})`)
        .filter(Boolean).join(", ") || "";

      const response = await fetch("http://localhost:5000/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, skills, experience, education }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Could not connect to the backend. Make sure the server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  // Score color helper
  const scoreColor = (score) => {
    if (score >= 8) return "#2d7a4f";
    if (score >= 5) return "#a07c00";
    return WINE;
  };

  return (
    <div style={{ maxWidth:"680px", margin:"0 auto", padding:"6rem 2rem 4rem" }}>
      <h2 style={{ fontFamily:"Georgia,serif", fontWeight:400, color:WINE,
        fontSize:"1.8rem", marginBottom:"0.3rem" }}>
        AI Resume Analysis
      </h2>
      <p style={{ color:TEXT_MID, fontSize:"0.9rem", marginBottom:"2rem" }}>
        Enter your target job title and our AI will analyse your resume against industry standards.
      </p>

      {/* Job Title Input */}
      <div style={{ display:"flex", gap:"1rem", marginBottom:"2rem", alignItems:"flex-end" }}>
        <div style={{ flex:1 }}>
          <label style={LS}>Target Job Title</label>
          <input
            style={IS}
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAnalyse()}
            placeholder='e.g. Data Analyst, Frontend Developer'
          />
        </div>
        <Btn onClick={handleAnalyse} small>
          {loading ? "Analysing..." : "Analyse →"}
        </Btn>
      </div>

      {/* Error */}
      {error && (
        <div style={{ background:"#fff0f0", border:`1px solid ${WINE}44`,
          borderRadius:"3px", padding:"0.8rem 1rem", color:WINE,
          fontSize:"0.88rem", marginBottom:"1.5rem", fontFamily:"Georgia,serif" }}>
          ⚠ {error}
        </div>
      )}

      {/* Loading spinner */}
      {loading && (
        <div style={{ textAlign:"center", padding:"3rem 0", color:WINE_MUTED,
          fontFamily:"Georgia,serif", fontSize:"0.95rem" }}>
          <div style={{ fontSize:"2rem", marginBottom:"1rem",
            animation:"spin 1.2s linear infinite", display:"inline-block" }}>✦</div>
          <p>Analysing your resume with AI...</p>
          <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
        </div>
      )}

      {/* Results */}
      {result && (
        <div>
          {/* Score Card */}
          <div style={{ background:"#fff", border:`1px solid ${BEIGE_BORDER}`,
            borderRadius:"3px", padding:"1.5rem", marginBottom:"1.5rem",
            display:"flex", alignItems:"center", gap:"2rem" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:"3.5rem", fontWeight:"700", lineHeight:1,
                color: scoreColor(result.score), fontFamily:"Georgia,serif" }}>
                {result.score}
              </div>
              <div style={{ fontSize:"11px", letterSpacing:"2px", color:WINE_MUTED,
                textTransform:"uppercase", marginTop:"4px" }}>out of 10</div>
            </div>
            <div>
              <p style={{ fontFamily:"Georgia,serif", color:WINE, fontWeight:"bold",
                fontSize:"1rem", margin:"0 0 4px" }}>Resume Score</p>
              <p style={{ color:TEXT_MID, fontSize:"0.88rem", margin:0, lineHeight:1.6 }}>
                {result.score >= 8
                  ? "Excellent! Your resume is well-optimised for this role."
                  : result.score >= 5
                  ? "Good start. A few targeted improvements will make a big difference."
                  : "Needs work. Follow the tips below to strengthen your resume."}
              </p>
            </div>
          </div>

          {/* Professional Summary */}
          {result.professionalSummary && (
            <div style={{ background:"#fff", border:`1px solid ${BEIGE_BORDER}`,
              borderRadius:"3px", padding:"1.2rem 1.5rem", marginBottom:"1.2rem" }}>
              <p style={{ fontFamily:"Georgia,serif", fontSize:"11px", letterSpacing:"2.5px",
                textTransform:"uppercase", color:WINE_MUTED, margin:"0 0 8px" }}>
                Suggested Professional Summary
              </p>
              <p style={{ color:TEXT_DARK, fontSize:"0.92rem", lineHeight:1.7, margin:0,
                fontStyle:"italic", fontFamily:"Georgia,serif" }}>
                "{result.professionalSummary}"
              </p>
            </div>
          )}

          {/* Skills Grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1.2rem" }}>
            {/* Required Skills */}
            <div style={{ background:"#fff", border:`1px solid ${BEIGE_BORDER}`,
              borderRadius:"3px", padding:"1.2rem" }}>
              <p style={{ fontFamily:"Georgia,serif", fontSize:"11px", letterSpacing:"2.5px",
                textTransform:"uppercase", color:WINE_MUTED, margin:"0 0 10px" }}>
                Required Skills
              </p>
              {result.requiredSkills?.map((skill, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px",
                  padding:"3px 0", color:TEXT_DARK, fontSize:"0.88rem" }}>
                  <span style={{ color:"#2d7a4f", fontSize:"14px" }}>✓</span> {skill}
                </div>
              ))}
            </div>

            {/* Missing Skills */}
            <div style={{ background:"#fff", border:`1px solid ${WINE}44`,
              borderRadius:"3px", padding:"1.2rem" }}>
              <p style={{ fontFamily:"Georgia,serif", fontSize:"11px", letterSpacing:"2.5px",
                textTransform:"uppercase", color:WINE_MUTED, margin:"0 0 10px" }}>
                Skill Gaps
              </p>
              {result.missingSkills?.length === 0
                ? <p style={{ color:"#2d7a4f", fontSize:"0.88rem" }}>No major gaps found! 🎉</p>
                : result.missingSkills?.map((skill, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px",
                    padding:"3px 0", color:TEXT_DARK, fontSize:"0.88rem" }}>
                    <span style={{ color:WINE, fontSize:"14px" }}>✦</span> {skill}
                  </div>
                ))
              }
            </div>
          </div>

          {/* Tips */}
          {result.tips?.length > 0 && (
            <div style={{ background:"#fff", border:`1px solid ${BEIGE_BORDER}`,
              borderRadius:"3px", padding:"1.2rem 1.5rem", marginBottom:"1.5rem" }}>
              <p style={{ fontFamily:"Georgia,serif", fontSize:"11px", letterSpacing:"2.5px",
                textTransform:"uppercase", color:WINE_MUTED, margin:"0 0 12px" }}>
                Actionable Tips
              </p>
              {result.tips.map((tip, i) => (
                <div key={i} style={{ display:"flex", gap:"12px", padding:"6px 0",
                  borderBottom: i < result.tips.length - 1 ? `1px solid ${BEIGE_BORDER}` : "none" }}>
                  <span style={{ color:WINE, fontFamily:"Georgia,serif",
                    fontWeight:"bold", minWidth:"20px" }}>{i + 1}.</span>
                  <p style={{ color:TEXT_DARK, fontSize:"0.9rem", lineHeight:1.6, margin:0 }}>{tip}</p>
                </div>
              ))}
            </div>
          )}

          <p style={{ textAlign:"center", color:WINE_MUTED, fontSize:"11px",
            letterSpacing:"1px", marginBottom:"2rem" }}>
            ✦ &nbsp; Powered by Groq · Llama 3.1 &nbsp; ✦
          </p>
        </div>
      )}

      <Btn outline onClick={onBack}>← Back to Resume</Btn>
    </div>
  );
}

// ─── ROOT APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [resumeData, setResumeData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyseSource, setAnalyseSource] = useState(null);

  const showNav = page !== "home";

  return (
    <div style={{ minHeight:"100vh", background:BEIGE, fontFamily:"Georgia,serif", color:TEXT_DARK }}>
      <ParticleCanvas />
      {showNav && <NavBar onHome={() => setPage("home")} />}
      <div style={{ position:"relative", zIndex:1 }}>
        {page === "home" && (
          <HomePage
            onBuild={() => setPage("form")}
            onUpload={() => setPage("upload")}
          />
        )}
        {page === "form" && (
          <ResumeForm
            onGenerate={(data) => { setResumeData(data); setPage("resume"); }}
            onBack={() => setPage("home")}
          />
        )}
        {page === "resume" && resumeData && (
          <ResumePage
            data={resumeData}
            onAnalyse={() => { setAnalyseSource("generated"); setPage("analyse"); }}
            onBack={() => setPage("form")}
          />
        )}
        {page === "upload" && (
          <UploadPage
            onAnalyse={(f) => { setUploadedFile(f); setAnalyseSource("upload"); setPage("analyse"); }}
            onBack={() => setPage("home")}
          />
        )}
        {page === "analyse" && (
          <AnalysePage
            source={analyseSource}
            resumeData={resumeData}
            onBack={() => setPage(analyseSource === "upload" ? "upload" : "resume")}
          />
        )}
      </div>
    </div>
  );
}
