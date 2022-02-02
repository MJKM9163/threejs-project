import React, { Suspense, useRef } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/cannon";
import { SpaceIndex } from "./components/space/SpaceIndex";
import { PlanetInfo } from "./components/PlanetInfo";
import { Stars, useHelper } from "@react-three/drei";
import { PointLightHelper } from "three";

const Light = () => {
  const pointLight = useRef();
  useHelper(pointLight, PointLightHelper, 500.5, "lightblue");

  return (
    <pointLight
      castShadow
      ref={pointLight}
      position={[0, 0, 0]}
      intensity={3}
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-camera-far={15000}
      shadow-camera-near={0.5}
      shadow-camera-left={-15000}
      shadow-camera-right={15000}
      shadow-camera-top={-15000}
      shadow-camera-bottom={15000}
    />
  );
};

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
          position: [1500, 7000, -7000],
          fov: 60,
          far: 25000,
          near: 3,
        }}
      >
        <ambientLight intensity={0.2} />
        <Light />
        <Physics gravity={[0, 0, 0]} iterations={1} broadphase="SAP">
          {/* <Debug> */}
          <Suspense fallback={null}>
            {/* <Galaxy /> */}

            <SpaceIndex />
          </Suspense>
          {/* </Debug> */}
        </Physics>
        {/* <axesHelper scale={500} /> */}
        <Stars radius={5000} depth={5000} count={500} />
      </Canvas>
    </>
  );
}

export default App;

// radius?: number;
//     depth?: number;
//     count?: number;
//     factor?: number;
//     saturation?: number;
//     fade?: boolean;
