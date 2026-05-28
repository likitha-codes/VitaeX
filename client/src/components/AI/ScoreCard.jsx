import React from "react";

const ScoreCard = ({ scoreData }) => {
  const {
    overallScore = 0,
    breakdown = {},
  } = scoreData || {};

  const getColor = () => {
    if (overallScore >= 75) return "#16a34a";
    if (overallScore >= 50) return "#eab308";
    return "#dc2626";
  };

  const progressColor = getColor();

  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        marginBottom: "30px",
      }}
    >
      <h2>AI Resume Score</h2>

      {/* Score Circle */}
      <div
        style={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background: `conic-gradient(${progressColor} ${
            overallScore * 3.6
          }deg, #e5e7eb 0deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            background: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "22px",
            color: progressColor,
          }}
        >
          {overallScore}/100
        </div>
      </div>

      <h3>Breakdown</h3>

      {Object.entries(breakdown).map(([key, value]) => (
        <div key={key} style={{ marginBottom: "15px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{key}</span>
            <span>{value}/100</span>
          </div>

          <div
            style={{
              background: "#ddd",
              height: "10px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${value}%`,
                height: "100%",
                background:
                  value >= 75
                    ? "#16a34a"
                    : value >= 50
                    ? "#eab308"
                    : "#dc2626",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreCard;