import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { storeApi, useStore } from "../../../hooks/useStore";
import { OrbitLine } from "../OrbitLine";

let a = 0;

export const Earth = ({ focusAndView, ...props }) => {
  const earthWorldPosition = new Vector3();
  const [earthRef, earthApi] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position: props.position,
    args: [20],
  }));

  let orbitHide = useRef(useStore.getState().orbitHide);
  let hideCheck = useStore((state) => state.setOrbitHide);

  useEffect(() => {
    storeApi.subscribe((state) => {
      orbitHide.current = state.orbitHide;
    });
  });

  useFrame(() => {
    earthApi.rotation.set(0, (a += 0.01), 0);
    earthRef.current?.getWorldPosition(earthWorldPosition);
  });

  console.log("earth 랜더링 확인");
  return (
    <>
      <mesh
        ref={earthRef}
        onClick={(e) => {
          focusAndView(earthWorldPosition, "earth");
          hideCheck(!orbitHide.current);
        }}
      >
        <boxGeometry args={[100, 100, 100]} />
        <meshNormalMaterial />
      </mesh>
      <OrbitLine args={[props.position[0] - 5, props.position[0] + 5, 100]} />
    </>
  );
};
