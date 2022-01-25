import React, { Suspense, useEffect, useRef } from "react";
import "./App.css";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Sky, Stars, useHelper } from "@react-three/drei";
import { Physics, Debug } from "@react-three/cannon";
import Ground from "./components/Ground";
import { Cube } from "./components/Cube";
import { SetSky, SetLight, SkyCountrol } from "./controls/skyControl";
import State from "./components/state/State";
import { DirectionalLightHelper } from "three";
import Character from "./components/Character";
import { Start } from "./starting/Start";
import styled from "styled-components";
import { useStore } from "./hooks/useStore";
import { Fire } from "./shaders/Fire";
import Ocean from "./shaders/Water";

const ChangeDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: ${(props) => (props.eventCheck ? "#494949" : "#7575750")};
  z-index: ${(props) => (props.eventCheck ? 100 : 0)};
  transition: 3s;
`;

function App() {
  const Light = () => {
    const ref = useRef();
    useHelper(ref, DirectionalLightHelper, 10);

    return (
      <>
        <ambientLight intensity={0.35} />
        <directionalLight
          ref={ref}
          intensity={3}
          position={SetLight()}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={1000}
          shadow-camera-near={0.5}
          shadow-camera-left={-300}
          shadow-camera-right={300}
          shadow-camera-top={-300}
          shadow-camera-bottom={300}
          castShadow
        />
      </>
    );
  };
  //position: [0, 0, -2] default

  const eventCheck = useStore((state) => state.eventChecker);
  const startCheck = useStore((state) => state.startRender);
  const render = useStore((state) => state.spaceShipRender);
  // console.log(startCheck);
  // console.log("App 컴포넌트 랜더링");

  return (
    <>
      <ChangeDiv eventCheck={eventCheck} />
      <State />
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
        <group>
          {/* <SkyCountrol /> */}
          <Sky sunPosition={SetSky()} distance={4000} turbidity={0.5} />
        </group>
        <Light />
        <Physics gravity={[0, -30, 0]} step={1 / 60}>
          <Debug scale={1}>
            <Suspense fallback={null}>
              <Cube position={[10, 5, 0]} type="wood" />
              {/* <Fire scale={10} /> */}
              <Ocean />
              <Character />
              {/* {startCheck ? <Start /> : <Character />} */}

              <Ground position={[0, -0.1, 0]} />
            </Suspense>
          </Debug>
        </Physics>
        {/* <Stars radius={200} count={300} /> */}
      </Canvas>
    </>
  );
}

export default App;
