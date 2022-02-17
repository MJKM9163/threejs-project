import React, { Suspense, useEffect, useRef } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/cannon";
import { SpaceIndex } from "./components/space/SpaceIndex";
import { Html, Stars, useHelper } from "@react-three/drei";
import { PointLightHelper } from "three";
import { Background } from "./components/space/Background";
import { SpaceCamera } from "./components/space/controls/SpaceCamera";
import { PlanetInfo } from "./interface/PlanetInfo";
import { useStore } from "./hooks/stores/useStore";
import { planetStore } from "./hooks/stores/planetStore";
import { ConstructionContainer } from "./interface/Construction/ConstructionContainer";

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

const RightClick = (e) => {
  let zoom = useStore.getState().zoom;
  let planetName = useStore.getState().name;
  let resources = planetStore.getState().planetResources;

  if (zoom === true) {
    useStore.setState({ zoom: false });
  } else if (resources[planetName]?.hide === false) {
    for (let i = 0; i < Object.keys(resources).length; i++) {
      planetStore.getState().planetResources[Object.keys(resources)[i]].hide = true;
    }
    planetStore.setState({
      planetResources: {
        ...resources,
      },
    });
  } else {
    console.log("확대 / 건설 상태가 아닙니다");
  }
};

const mouseUpEventAllScreen = () => {
  if (planetStore.getState().tapState.check === true) {
    planetStore.setState({ tapState: { planetName: "???", check: false } });
  }
};

document.addEventListener("contextmenu", RightClick);
document.addEventListener("mouseup", mouseUpEventAllScreen);

function App() {
  // const test = planetStore.getState().planetResourcesl

  console.log("메인 랜더링 확인");
  return (
    <>
      <PlanetInfo />
      <ConstructionContainer />
      <Canvas
        shadows
        colorManagement
        sRGB
        camera={{
          position: [1500, 7000, -7000],
          fov: 60,
          far: 250000,
          near: 3,
        }}>
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
