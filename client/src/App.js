import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BuildResumePage from "./pages/BuildResumePage";
import ResumeResultPage from "./pages/ResumeResultPage";
import UploadResumePage from "./pages/UploadResumePage";
import AnalysisPage from "./pages/AnalysisPage";
import ResumeEditor from "./components/ResumeEditor";
import TemplateSelector from "./components/TemplateSelector";
import TemplatePage from "./pages/TemplatePage";

const DEFAULT_FORM = {
  name: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  portfolio: "",
  headline: "",
  summary: "",
  skills: [""],
  experience: [{ company: "", role: "", duration: "", description: "" }],
  education: [{ institution: "", degree: "", year: "", cgpa: "" }],
  projects: [{ name: "", description: "", tech: "" }],
  certifications: "",
  languages: "",
};

export default function App() {
  const [form, setForm] = useState(DEFAULT_FORM);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/build" element={<BuildResumePage form={form} setForm={setForm} />} />
        <Route path="/result" element={<ResumeResultPage form={form} />} />
        <Route path="/upload" element={<UploadResumePage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/edit" element={<ResumeEditor form={form} setForm={setForm} />} />
        <Route path="/templates" element={<TemplateSelector />} />
        <Route path="/template/:id" element={<TemplatePage form={form} />} />
      </Routes>
    </BrowserRouter>
  );
}