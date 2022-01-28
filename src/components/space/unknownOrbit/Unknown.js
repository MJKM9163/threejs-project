import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { storeApi, useStore } from "../../../hooks/useStore";
import { OrbitLine } from "../OrbitLine";

let a = 0;

export const Unknown = ({ focusAndView, ...props }) => {
  const unknownWorldPosition = new Vector3();
  const [unknownRef, unknownApi] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position: props.position,
    args: [27],
  }));

  const orbitHide = useRef(useStore.getState().orbitHide);
  const hideCheck = useStore((state) => state.setOrbitHide);

  useEffect(() => {
    storeApi.subscribe((state) => {
      orbitHide.current = state.orbitHide;
    });
  });

  useFrame(() => {
    unknownApi.rotation.set(0, (a += 0.01), 0);
    unknownRef.current?.getWorldPosition(unknownWorldPosition);
  });

  console.log("unknown 랜더링 확인");
  return (
    <>
      <mesh
        ref={unknownRef}
        onClick={(e) => {
          focusAndView(unknownWorldPosition, "unknown");
          hideCheck(!orbitHide.current);
        }}
      >
        <sphereGeometry args={[27]} />
        <meshNormalMaterial />
      </mesh>
      <OrbitLine args={[props.position[0] - 5, props.position[0] + 5, 100]} />
    </>
  );
};
