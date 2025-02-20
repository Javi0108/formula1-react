import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vibrant } from "node-vibrant/browser";
import { Swatch } from "@vibrant/color";

const Loader: React.FC = () => {
  return (
    <Html center>
      <div id="carLoader">
        <span className="loader"></span>
      </div>
    </Html>
  );
};

const CarModel: React.FC<{
  modelPath: string;
  position?: [number, number, number];
}> = ({ modelPath, position = [0, 0, 0] }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} position={position} />;
};

const CarViewer: React.FC<{ modelPath: string; driverId: string }> = ({
  modelPath,
  driverId,
}) => {
  const [mainColor, setMainColor] = useState([0, 0, 0]);

  useEffect(() => {
    const vibrant = new Vibrant(`/pilots/imgs/${driverId}.webp`);
    vibrant.getPalette().then((palette) => {
      if (palette.DarkMuted) {
        setMainColor([
          palette.DarkMuted.rgb[0],
          palette.DarkMuted.rgb[1],
          palette.DarkMuted.rgb[2],
        ]);
      }
    });
  }, [driverId]);

  console.log(`rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`);

  return (
    <Canvas
      camera={{
        position: [0, 1, 5],
      }}
      style={{
        backgroundColor: `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`,
      }}
    >
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
};

export default CarViewer;
