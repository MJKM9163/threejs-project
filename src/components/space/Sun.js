import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { storeApi, useStore } from "../../hooks/useStore";

let a = 0.5;

export const Sun = ({ focusAndView }) => {
  const [sunRef, sunApi] = useSphere(() => ({
    mass: 100,
    type: "Static",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    args: [100],
  }));

  const orbitHide = useRef(useStore.getState().orbitHide);
  const hideCheck = useStore((state) => state.setOrbitHide);

  useEffect(() => {
    storeApi.subscribe((state) => {
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
          focusAndView(e.object.position, "sun");
          hideCheck(!orbitHide.current);
        }}
      >
        <sphereGeometry args={[100]} />
        <meshNormalMaterial />
        <axesHelper scale={300} />
      </mesh>
    </>
  );
};
