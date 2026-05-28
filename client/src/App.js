import React from "react";
import ScoreCard from "./components/AI/ScoreCard";
import AIsuggestions from "./components/AI/AIsuggestions";

function App() {
  const scoreData = {
    overallScore: 78,
    breakdown: {
      Skills: 82,
      Experience: 74,
      Education: 69,
    },
  };

  const aiData = {
    skillGaps: [
      "Docker",
      "Kubernetes",
      "AWS",
    ],
    suggestions: [
      "Add more measurable achievements",
      "Include deployment projects",
      "Improve ATS keywords",
    ],
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1>AI Resume Analysis</h1>

      <ScoreCard scoreData={scoreData} />

      <AIsuggestions aiData={aiData} />
    </div>
  );
}

export default App;