import React, { Suspense, useRef } from "react";
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
import { screenStore } from "./hooks/stores/screenStore";
import { RightOption } from "./interface/SideTap/RightOption";
import { Resources } from "./interface/Construction/Resources";
import { AllResourcesFun } from "./hooks/AllResourcesFun";
import { ResearchMap } from "./interface/Research/ResearchMap";
import { FlyingIndex } from "./flyingObjects/FlyingIndex";
import { RayCasters } from "./hooks/RayCasters";
import { SatelliteField } from "./satelliteObjects/SatelliteField";
import { SatelliteIndex } from "./satelliteObjects/SatelliteIndex";

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
  let researchMapOnOff = screenStore.getState().researchMapOnOff;

  if (zoom === true) {
    setTimeout(() => {
      useStore.setState({ mainPlanet: false });
    }, 500);
    useStore.setState({ zoom: false });
    useStore.setState({ orbitHide: false });
  } else if (resources[planetName]?.hide === false) {
    for (let item in resources) {
      planetStore.getState().planetResources[item].hide = true;
    }
    planetStore.setState({
      planetResources: {
        ...resources,
      },
    });
  } else if (researchMapOnOff === true) {
    screenStore.setState({ researchMapOnOff: false });
  } else {
    console.log("확대 / 건설 상태가 아닙니다");
  }
};

const mouseUpEventAllScreen = () => {
  if (screenStore.getState().tapCheck === true) {
    screenStore.setState({ tapCheck: false });
  }
};

document.addEventListener("contextmenu", RightClick);
document.addEventListener("mouseup", mouseUpEventAllScreen);

function App() {
  console.log("메인 랜더링 확인");
  return (
    <>
      <ResearchMap />
      <PlanetInfo />
      <AllResourcesFun />
      <Resources />
      <ConstructionContainer />
      <RightOption />
      <Canvas
        shadows
        colorManagement
        sRGB
        camera={{
          fov: 60,
          far: 250000,
          near: 3,
        }}>
        <ambientLight intensity={0.2} />

        <Light />
        <Physics gravity={[0, 0, 0]} iterations={1}>
          <Debug color="red" scale={1.1}>
            <Suspense fallback={<Html>loading..</Html>}>
              {/* <Galaxy /> */}
              <SpaceIndex />
              <Background />
              <FlyingIndex />
              <SatelliteField />
              <SatelliteIndex />
            </Suspense>
          </Debug>
        </Physics>
        <axesHelper scale={5000} />
        <Stars radius={5000} depth={5000} count={500} />
        {/* <OrbitControls /> */}
        <SpaceCamera />
        {/* <RayCasters /> */}
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
