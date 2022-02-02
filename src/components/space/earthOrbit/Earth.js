import { useSphere } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { EffectSelect } from "../../../hooks/EffectSelect";
import { useStore } from "../../../hooks/useStore";
import { OrbitLine } from "../OrbitLine";

let a = 0;

export const Earth = ({ SetUp, ...props }) => {
  const { nodes, materials } = useGLTF("/mainPlanet/scene.gltf");

  const argsSize = useRef(useStore.getState().size);

  const earthWorldPosition = new Vector3();
  const [earthRef, earthApi] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position: props.position,
    args: [argsSize.current["middle"]],
  }));

  useFrame(() => {
    earthApi.rotation.set(0, (a += 0.005), 0);
    earthRef.current?.getWorldPosition(earthWorldPosition);
  });
  useStore.setState({ earthEffect: EffectSelect(argsSize.current["middle"]) });

  console.log("earth 랜더링 확인");
  return (
    <>
      <group ref={earthRef} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={1.9}>
          <mesh
            castShadow
            onClick={(e) => {
              SetUp(
                earthWorldPosition,
                "지구",
                "지구형",
                argsSize.current["middle"]
              );
            }}
            geometry={nodes.mesh_0.geometry}
            material={materials.Material__25}
          />
          <mesh
            geometry={nodes.mesh_1.geometry}
            material={materials.Material__65}
          />
        </group>
        <axesHelper scale={500} />
      </group>
      <OrbitLine args={[props.position[0] - 5, props.position[0] + 5, 100]} />
    </>
  );
};
