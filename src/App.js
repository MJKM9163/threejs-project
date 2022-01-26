import React, { Suspense } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <>
      <Canvas
        shadows
        colorManagement
        sRGB
        camera={{
          position: [0, 50, -100],
          fov: 60,
          far: 8000,
          near: 3,
        }}
      >
        <Suspense></Suspense>
      </Canvas>
    </>
  );
}

export default App;
