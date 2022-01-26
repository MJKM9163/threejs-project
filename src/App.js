import React, { Suspense } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { TestBox } from "./components/TestBox";
import { Debug, Physics } from "@react-three/cannon";
import { SpaceIndex } from "./components/space/SpaceIndex";

function App() {
  return (
    <>
      <Canvas
        shadows
        colorManagement
        sRGB
        camera={{
          position: [15, 30, -50],
          fov: 60,
          far: 8000,
          near: 3,
        }}
      >
        <Physics gravity={[0, 0, 0]} iterations={1} broadphase="SAP">
          <Debug>
            <Suspense>
              {/* <TestBox /> */}
              <SpaceIndex />
            </Suspense>
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
