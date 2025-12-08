import React from "react";

type CardProps = {
  title: string;
  value: string | number | null;
  loading?: boolean;
};

export default function Card({ title, value, loading }: CardProps) {
  return (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: "10px",
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        width: "200px",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "1rem", color: "#555" }}>{title}</h3>

      {loading ? (
        <p style={{ color: "#888" }}>Loading...</p>
      ) : (
        <p style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{value}</p>
      )}
    </div>
  );
}