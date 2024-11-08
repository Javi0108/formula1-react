import React from 'react';
import '../style/Circuit.css'

interface CircuitProps {
  circuit_name: string;
}

const Circuit: React.FC<CircuitProps> = ({ circuit_name }) => {

  if (!circuit_name) {
    return (
        <div id='noCircuit'>
            No circuit selected
        </div>
    );
  }
  console.log(circuit_name)
  return (
    <div id='circuitContainer'>
      <h1>Circuit: {circuit_name}</h1>
      <img src={`circuits/${circuit_name}.webp`} alt='Imagen del circuito' width={1000}/>
    </div>
  );
};

export default Circuit;