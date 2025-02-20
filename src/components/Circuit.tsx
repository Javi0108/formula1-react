import React from "react";
import "../style/Circuit.css";

interface CircuitProps {
  circuit_id: string;
  circuit_name: string;
  circuit_country: string;
}

const Circuit: React.FC<CircuitProps> = ({
  circuit_id,
  circuit_name,
  circuit_country,
}) => {
  return (
    <div id="circuitContainer">
      <span id="sectionTitle">
        {circuit_name}, {circuit_country}
      </span>
      <div id="circuitImg">
        <img
          id="circuitImage"
          src={`/circuits/${circuit_id}.webp`}
          alt="Imagen del circuito"
        />
      </div>
    </div>
  );
};

export default Circuit;
