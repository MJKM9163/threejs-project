import { useSphere } from "@react-three/cannon";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Vector3 } from "three";
//import { EffectModelSelect } from "../../../hooks/EffectModelSelect"; 잠시 주석처리
import { EffectSelect } from "../../../hooks/EffectSelect";
import { PlanetNameSelect } from "../../../hooks/planetNameSelect";
import { useStore } from "../../../hooks/stores/useStore";
import { HtmlContainer } from "../../../interface/CanvasInHTML/HtmlContainer";
import { OrbitLine } from "../OrbitLine";

let a = 0;
let Pname = null;
let effects;
let effectsModels;

export const Earth = ({ SetUp, ...props }) => {
  const effectRef = useRef();
  const { nodes, materials } = useGLTF("/mainPlanet/scene.gltf");

  const argsSize = useRef(useStore.getState().size);

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
  });

  console.log("earth 랜더링 확인");
  return (
    <>
      <group ref={earthRef} dispose={null}>
        <Html>
          <HtmlContainer />
        </Html>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={1.9}>
          <mesh
            castShadow
            onClick={(e) => {
              SetUp(earthWorldPosition, Pname, "지구형", argsSize.current["middle"], effects);
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
