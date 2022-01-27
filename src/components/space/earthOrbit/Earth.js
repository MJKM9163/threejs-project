import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../hooks/useStore";

let a = 0;
let aa = 0;

export const Earth = ({ focusAndView, ...props }) => {
  //const zoom = useStore((state) => state.zoom);
  const setZoom = useStore((state) => state.setZoom);
  const [earthRef, earthApi] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position: props.position,
    //rotation: [10, 10, 10],
    args: [20],
  }));
  //earthApi.rotation.subscribe((p) => console.log(p));

  useFrame(() => {
    earthApi.rotation.set(0, (a += 0.01), 0);
  });

  return (
    <>
      <mesh
        ref={earthRef}
        onClick={(e) => {
          focusAndView(e.object.position, "earth");
          setZoom(true);
        }}
      >
        {/* <sphereGeometry args={[20]} /> */}
        <boxGeometry args={[100, 100, 100]} />
        <meshNormalMaterial />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[props.position[0] - 5, props.position[0] + 5, 100]}
        />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};
