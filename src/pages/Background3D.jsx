import React from "react";
import "../Background3D.css";

export default function Background3D() {
  // Generate 20 cubes with random properties
  const cubes = [...Array(20)].map((_, i) => {
    // Random size between 20px and 60px
    const size = 20 + Math.random() * 40;

    // Random position within viewport (0-100%)
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    // Random animation delay for stagger effect
    const delay = (Math.random() * 10).toFixed(2);

    return (
      <div
        key={i}
        className="cube"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${top}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${5 + Math.random() * 10}s`,
        }}
      />
    );
  });

  return (
    <div
      className="background-3d absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      role="presentation"
    >
      {cubes}
    </div>
  );
}
