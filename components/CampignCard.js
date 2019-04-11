import React from 'react';

export default function CampignCard({ campigns }) {
  return (
    <div>
      {campigns.map(c => (
        <span>{c}</span>
      ))}
    </div>
  );
}
