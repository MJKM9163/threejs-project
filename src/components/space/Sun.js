import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { useStore } from "../../hooks/useStore";

let a = 0.5;

export const Sun = ({ SetUp }) => {
  const orbitHide = useRef(useStore.getState().orbitHide);
  const argsSize = useRef(useStore.getState().size);
  // const hideCheck = useStore.setState().orbitHide;

  const [sunRef, sunApi] = useSphere(() => ({
    mass: 100,
    type: "Static",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    args: [argsSize.current["large"]],
  }));

  useEffect(() => {
    useStore.subscribe((state) => {
      orbitHide.current = state.orbitHide;
    });
  });

  useFrame(() => {
    sunApi.rotation.set(0, (a += 0.01), 0);
  });
  console.log("태양 랜더링 확인");

  return (
    <>
      <mesh
        ref={sunRef}
        onClick={(e) => {
          SetUp(
            e.object.position,
            "태양",
            "주계열성",
            e.object.geometry.parameters.radius
          );
          useStore.setState({ orbitHide: !orbitHide.current });
        }}
      >
        <sphereGeometry args={[argsSize.current["large"]]} />
        <meshNormalMaterial />
        <axesHelper scale={500} />
      </mesh>
    </>
  );
};
