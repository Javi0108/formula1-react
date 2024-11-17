import React from "react";
import "../style/Circuit.css";

interface CircuitProps {
  circuit_id: string;
  circuit_name: string;
  circuit_country: string;
}

const Circuit: React.FC<CircuitProps> = ({ circuit_id, circuit_name, circuit_country }) => {
  if (!circuit_id) {
    return (
      <div id="loadingContainer">
        <span>No circuit selected</span>
      </div>
    );
  }
  return (
    <div id="circuitContainer">
      <h3 id="sectionTitle">
        Circuit: {circuit_name}, {circuit_country}
      </h3>
      <div id="circuitImg">
        <img
          id="circuitImage"
          src={`circuits/${circuit_id}.webp`}
          alt="Imagen del circuito"
        />
      </div>
    </div>
  );
};

export default Circuit;
