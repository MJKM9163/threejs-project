import React, { Suspense } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { TestBox } from "./components/TestBox";
import { Debug, Physics } from "@react-three/cannon";
import { SpaceIndex } from "./components/space/SpaceIndex";
//import { useStore } from "./hooks/useStore";

function App() {
  // const viewName = useStore((state) => state.name);
  // console.log(viewName);
  console.log("app");
  return (
    <>
      <Canvas
        shadows
        colorManagement
        sRGB
        camera={{
          position: [1100, 2600, -4000],
          fov: 60,
          far: 8000,
          near: 3,
        }}
      >
        <Physics gravity={[0, 0, 0]} iterations={1} broadphase="SAP">
          {/* <Debug> */}
          <Suspense>
            {/* <TestBox /> */}
            <SpaceIndex />
          </Suspense>
          {/* </Debug> */}
        </Physics>
        <axesHelper scale={100} />
      </Canvas>
    </>
  );
}

export default App;
