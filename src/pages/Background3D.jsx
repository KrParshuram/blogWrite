import React from 'react';
import '../Background3D.css';

export default function Background3D() {
  return (
    <div className="background-3d" aria-hidden="true">
      {[...Array(20)].map((_, i) => (
        <div className="cube" key={i} />
      ))}
    </div>
  );
}
