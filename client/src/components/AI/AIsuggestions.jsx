import React from "react";

const AIsuggestions = ({ aiData }) => {
  const {
    skillGaps = [],
    suggestions = [],
  } = aiData || {};

  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "500px",
      }}
    >
      <h2>AI Suggestions</h2>

      {/* Skill Gaps */}
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ color: "red" }}>Missing Skills</h3>

        {skillGaps.length > 0 ? (
          skillGaps.map((gap, index) => (
            <div
              key={index}
              style={{
                background: "#ffe5e5",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              {gap}
            </div>
          ))
        ) : (
          <p>No skill gaps found.</p>
        )}
      </div>

      {/* Suggestions */}
      <div>
        <h3 style={{ color: "green" }}>
          Improvement Suggestions
        </h3>

        {suggestions.length > 0 ? (
          suggestions.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#e7ffe7",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              {item}
            </div>
          ))
        ) : (
          <p>No suggestions available.</p>
        )}
      </div>
    </div>
  );
};

export default AIsuggestions;