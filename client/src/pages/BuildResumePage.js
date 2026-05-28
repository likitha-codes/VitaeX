// VitaeX/client/src/pages/BuildResumePage.js

import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import NavBar from "../components/NavBar";
import ResumeForm from "../components/ResumeForm";

export default function BuildResumePage({ form, setForm }) {
  const navigate = useNavigate();

  const handleGenerate = (data) => {
    setForm(data);
    navigate("/result");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F0EBE0" }}>
      <ParticleBackground />
      <NavBar />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ResumeForm
          form={form}
          setForm={setForm}
          onGenerate={handleGenerate}
          onBack={() => navigate("/")}
        />
      </div>
    </div>
  );
}