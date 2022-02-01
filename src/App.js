import React, { Suspense } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { TestBox } from "./components/TestBox";
import { Debug, Physics } from "@react-three/cannon";
import { SpaceIndex } from "./components/space/SpaceIndex";
import { PlanetInfo } from "./components/PlanetInfo";

function App() {
  //const zoomCheck = useRef(useStoreApi.getState().zoom);
  console.log("메인 랜더링 확인");
  return (
    <>
      <PlanetInfo />
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
        {/* <axesHelper scale={500} /> */}
      </Canvas>
    </>
  );
}

export default App;
