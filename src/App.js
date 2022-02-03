import React, { Suspense, useRef } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/cannon";
import { SpaceIndex } from "./components/space/SpaceIndex";
import { PlanetInfo } from "./components/PlanetInfo";
import { Html, OrbitControls, Stars, useHelper } from "@react-three/drei";
import { PointLightHelper } from "three";
import { Background } from "./components/space/Background";
import { SpaceCamera } from "./components/space/controls/SpaceCamera";

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
          far: 250000,
          near: 3,
        }}
      >
        <ambientLight intensity={0.2} />
        <Light />
        <Physics gravity={[0, 0, 0]} iterations={1} broadphase="SAP">
          {/* <Debug> */}
          <Suspense fallback={<Html>loading..</Html>}>
            {/* <Galaxy /> */}

            <SpaceIndex />
            <Background />
          </Suspense>
          {/* </Debug> */}
        </Physics>
        <axesHelper scale={5000} />
        <Stars radius={5000} depth={5000} count={500} />
        {/* <OrbitControls /> */}
        <SpaceCamera />
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
