import React, { Suspense, useRef } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/cannon";
import { SpaceIndex } from "./components/space/SpaceIndex";
import { Html, Stars, useHelper } from "@react-three/drei";
import { PointLightHelper } from "three";
import { Background } from "./components/space/Background";
import { SpaceCamera } from "./components/space/controls/SpaceCamera";
import { screenStore } from "./hooks/stores/screenStore";
import { FlyingIndex } from "./flyingObjects/FlyingIndex";
import { SatelliteField } from "./components/satelliteObjects/SatelliteField";
import { SatelliteIndex } from "./components/satelliteObjects/SatelliteIndex";
import { ClockEvents } from "./hooks/clockEvents";
import { Loading } from "./components/interface/Infos/LoadingOrOver";
import { InterfaceIndex } from "./components/interface/InterfaceIndex";

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
  let zoom = screenStore.getState().zoom;
  let researchMapOnOff = screenStore.getState().researchMapOnOff;
  let productionControl = screenStore.getState().productionControl;

  if (zoom === true) {
    screenStore.setState({ zoom: false });
    screenStore.setState({ orbit: false });
  } else if (productionControl === true) {
    screenStore.setState((state) => (state.productionControl = false));
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
      <InterfaceIndex />

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
        <ClockEvents />
        <Light />
        <Physics gravity={[0, 0, 0]} iterations={1}>
          {/* <Debug color="red" scale={1.1}> */}
          <Suspense
            fallback={
              <Html>
                <Loading />
              </Html>
            }>
            <SpaceIndex />
            <Background />
            <FlyingIndex />
            <SatelliteField />
            <SatelliteIndex />
          </Suspense>
          {/* </Debug> */}
        </Physics>
        {/* <axesHelper scale={5000} /> */}
        <Stars radius={5000} depth={5000} count={500} />
        <SpaceCamera />
      </Canvas>
    </>
  );
}

export default App;
