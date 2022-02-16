import { useSphere } from "@react-three/cannon";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
//import { EffectModelSelect } from "../../../hooks/EffectModelSelect"; 잠시 주석처리
import { EffectSelect } from "../../../hooks/EffectSelect";
import { PlanetNameSelect } from "../../../hooks/planetNameSelect";
import { planetStore } from "../../../hooks/stores/planetStore";
import { useStore } from "../../../hooks/stores/useStore";
import { TapPlanet } from "../../../interface/CanvasInHTML/TapPlanet";
import { OrbitLine } from "../OrbitLine";

let a = 0;
let Pname = null;
let effects;
let effectsModels;

let onTimer;

export const Earth = ({ SetUp, ...props }) => {
  const effectRef = useRef();
  const html = useRef();
  const { nodes, materials } = useGLTF("/mainPlanet/scene.gltf");

  const argsSize = useRef(useStore.getState().size);
  const tap = useRef(planetStore.getState().tapState);

  useEffect(() => {
    planetStore.subscribe(
      (state) => (tap.current = state.tapState),
      (state) => state.tapState
    );
  });

  const timer = () => {
    onTimer = setTimeout(() => {
      html.current.style.display = "block";
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

    if (tap.current?.check === false) {
      html.current.style.display = "none";
    }
  });

  console.log("earth 랜더링 확인");
  return (
    <>
      <group ref={earthRef} dispose={null}>
        <Html ref={html}>
          <TapPlanet planet={Pname} />
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
