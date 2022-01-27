import { useCylinder, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../hooks/useStore";
import { SpaceCamera } from "./controls/SpaceCamera";
import { Earth } from "./earthOrbit/Earth";
import { Sun } from "./Sun";
import { Unknown } from "./unknownOrbit/Unknown";

let earthStarting = 0.0;
let unknownStarting = 10.0;
export const SpaceIndex = () => {
  const setFocus = useStore((state) => state.setFocus);
  const viewTarget = useStore((state) => state.setName);
  const setCameraRotationY = useStore((state) => state.setCameraRotationY);

  const allOrbitRef = useRef();
  const earthOrbitRef = useRef();

  const unknownOrbitRef = useRef();
  console.log(earthOrbitRef.current?.rotation);
  useFrame(() => {
    earthOrbitRef.current?.rotation.set(0, (earthStarting += 0.0015), 0);
    unknownOrbitRef.current?.rotation.set(0, (unknownStarting -= 0.0005), 0);
    //console.log(earthOrbitRef.current?.rotation.y);
    setCameraRotationY(earthOrbitRef.current?.rotation.y);
  });

  return (
    <>
      <group ref={allOrbitRef} rotation={[0, 0, 0]}>
        <Sun
          focusAndView={(focus, name) => (setFocus(focus), viewTarget(name))}
        />
        <group ref={earthOrbitRef} rotation={[0, 0, 0]}>
          <Earth
            position={[550, 0, 0]}
            focusAndView={(focus, name) => (setFocus(focus), viewTarget(name))}
          />
        </group>
        <group ref={unknownOrbitRef}>
          <Unknown position={[1200, 0, 0]} />
        </group>
        <axesHelper scale={500} />
        <SpaceCamera />
      </group>
    </>
  );
};
