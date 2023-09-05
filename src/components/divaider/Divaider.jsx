import React from "react";
import "./divaider.css";
export default function Divaider({ width }) {
  return (
    <div
      style={{
        width: `${width}%`,
      }}
      className="divaider"
    ></div>
  );
}
