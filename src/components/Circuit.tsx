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
  return (
    <div>
      <h1 id="circuitName">
        Circuit: {circuit_name}, {circuit_country}
      </h1>
      <div id="circuitContainer">
        <img
          id="circuitImage"
          src={`circuits/${circuit_name}.webp`}
          alt="Imagen del circuito"
          width={1000}
        />
        <div>
          See more <i className="bi bi-arrow-down"></i>
        </div>
      </div>
    </div>
  );
};

export default Circuit;
