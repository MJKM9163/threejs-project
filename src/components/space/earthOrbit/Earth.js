import { useSphere } from "@react-three/cannon";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
//import { EffectModelSelect } from "../../../hooks/EffectModelSelect"; 잠시 주석처리
import { EffectSelect } from "../../../hooks/EffectSelect";
import { PlanetNameSelect } from "../../../hooks/planetNameSelect";
import { screenStore } from "../../../hooks/stores/screenStore";
import { useStore } from "../../../hooks/stores/useStore";
import { TapPlanet } from "../../../interface/CanvasInHTML/TapPlanet";
import { LeftInfoBox } from "../../../interface/LeftInfo/LeftInfoBox";
import { OrbitLine } from "../OrbitLine";

let a = 0;
let Pname = null;
let effects;
let effectsModels;

let onTimer;

export const Earth = ({ SetUp, ...props }) => {
  const effectRef = useRef();
  const tapRef = useRef();
  const infoRef = useRef();
  const { nodes, materials } = useGLTF("/mainPlanet/scene.gltf");

  const argsSize = useRef(useStore.getState().size);
  const leftInfoOnOff = useRef(screenStore.getState().leftInfoOnOff);
  const tap = useRef(screenStore.getState().tapCheck);

  useEffect(() => {
    screenStore.subscribe(
      (state) => (leftInfoOnOff.current = state.leftInfoOnOff),
      (state) => state
    );
  });
  useEffect(() => {
    screenStore.subscribe(
      (state) => (tap.current = state.tapCheck),
      (state) => state
    );
  });

  const timer = () => {
    onTimer = setTimeout(() => {
      tapRef.current.style.display = "block";
    }, 300);
  };

  const earthWorldPosition = new Vector3();
  const [earthRef, earthApi] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position: props.position,
    args: [argsSize.current["middle"]],
  }));

  if (Pname === null) {
    Pname = PlanetNameSelect();
    effects = EffectSelect(argsSize.current["middle"]);
  }

  //const effectModels = EffectModelSelect(effects[0], effects[1]); 잠시 주석처리

  useFrame(() => {
    earthApi.rotation.set(0, (a += 0.005), 0);
    earthRef.current?.getWorldPosition(earthWorldPosition);
    effectRef.current.rotation.set(0, a - 0.002, a - 0.003);

    if (tap?.current === false) {
      tapRef.current.style.display = "none";
    }
    if (leftInfoOnOff?.current === false) {
      infoRef.current.style.display = "none";
    } else if (leftInfoOnOff?.current === true) {
      infoRef.current.style.display = "block";
    }
  });

  console.log("earth 랜더링 확인");
  return (
    <>
      <group ref={earthRef} dispose={null}>
        <Html ref={tapRef}>
          <TapPlanet planet={Pname} />
        </Html>
        <Html ref={infoRef} center distanceFactor={10000}>
          <LeftInfoBox planet={Pname} />
        </Html>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={1.9}>
          <mesh
            castShadow
            onClick={(e) => {
              SetUp(earthWorldPosition, Pname, "지구형", argsSize.current["middle"], effects);
            }}
            onPointerDown={(e) => {
              timer();
            }}
            onPointerUp={(e) => {
              clearTimeout(onTimer);
            }}
            geometry={nodes.mesh_0.geometry}
            material={materials.Material__25}
          />
          <mesh geometry={nodes.mesh_1.geometry} material={materials.Material__65} />
          <group ref={effectRef}>
            {/* {effectModels.map((model, index) => ( 잠시 주석처리
              <group
                rotation={[Math.PI / 1, 0.3, -Math.PI / 2]}
                position={[150, 50, 0]}
                scale={0.5}
                key={index}
              >
                {model}
                <axesHelper scale={500} />
              </group>
            ))} */}
          </group>
        </group>
        <axesHelper scale={500} />
      </group>
      <OrbitLine args={[props.position[0] - 5, props.position[0] + 5, 100]} />
    </>
  );
};
