import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";

const Loader: React.FC = () => {
  return (
    <Html center>
      <div
        style={{
          color: "black",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Cargando...
      </div>
    </Html>
  );
};

const CarModel: React.FC<{ modelPath: string; position?: [number, number, number] }> = ({
  modelPath,
  position = [0, 0, 0],
}) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} position={position} />;
};

const CarViewer: React.FC<{ modelPath: string }> = ({ modelPath }) => (
  <Canvas camera={{ position: [0, 1, 5] }}>
    <directionalLight position={[0, 0, 0]} intensity={5} />
    <directionalLight position={[10, 0, 0]} intensity={5} />
    <directionalLight position={[-10, 0, 0]} intensity={5} />
    <directionalLight position={[0, -10, 0]} intensity={5} />
    <directionalLight position={[0, 10, 0]} intensity={5} />

    <Suspense fallback={<Loader />}>
      <CarModel modelPath={modelPath} position={[0, 0, 0]} />
    </Suspense>
    <OrbitControls />
  </Canvas>
);

export default CarViewer;
