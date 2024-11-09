import React from "react";
import "../style/Circuit.css";

interface CircuitProps {
  circuit_name: string;
  circuit_country: string;
}

const Circuit: React.FC<CircuitProps> = ({ circuit_name, circuit_country }) => {
  if (!circuit_name) {
    return (
      <div id="loadingContainer">
        <span>No circuit selected</span>
      </div>
    );
  }
  console.log(circuit_name);
  return (
    <div id="circuitContainer">
      <h1>
        Circuit: {circuit_name}, {circuit_country}
      </h1>
      <img
        src={`circuits/${circuit_name}.webp`}
        alt="Imagen del circuito"
        width={1000}
      />
    </div>
  );
};

export default Circuit;
