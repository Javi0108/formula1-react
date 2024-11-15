import React, { useRef  } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CarModel: React.FC<{ modelPath: string; position?: [number, number, number] }> = ({ modelPath, position = [0, 0, 0] }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Object3D>(null);

//   // Hook para animar en cada frame
//   useFrame(() => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y += 0.003; // Rotación en el eje Y
//     }
//   });

  return <primitive object={scene} position={position} /*ref={modelRef}*/ />;
};

const CarViewer: React.FC<{ modelPath: string }> = ({ modelPath }) => (
  <Canvas camera={{ position: [0, 1, 5.5] }}>
    <directionalLight position={[0, 0, 0]} intensity={5} />
    <directionalLight position={[10, 0, 0]} intensity={5} />
    <directionalLight position={[-10, 0, 0]} intensity={5} />
    <directionalLight position={[0, -10, 0]} intensity={5} />
    <directionalLight position={[0, 10, 0]} intensity={5} />
    <CarModel modelPath={modelPath} position={[0, 0, 0]} />
    <OrbitControls />
  </Canvas>
);

export default CarViewer;
