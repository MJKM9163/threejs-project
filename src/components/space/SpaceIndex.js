import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { useStore, storeApi } from "../../hooks/useStore";
import { SpaceCamera } from "./controls/SpaceCamera";
import { Earth } from "./earthOrbit/Earth";
import { Sun } from "./Sun";
import { Unknown } from "./unknownOrbit/Unknown";

let earthStarting = 0.0;
let unknownStarting = 0.0;
export const SpaceIndex = () => {
  const setZoom = useStore((state) => state.setZoom);
  const setFocus = useStore((state) => state.setFocus);
  const viewTarget = useStore((state) => state.setName);

  const allOrbitRef = useRef();
  const earthOrbitRef = useRef();
  const unknownOrbitRef = useRef();

  let zoomCheck = useRef(useStore.getState().zoom);
  useEffect(() => {
    storeApi.subscribe((state) => {
      zoomCheck.current = state.zoom;
    });
  });

  useFrame(() => {
    earthOrbitRef.current?.rotation.set(0, (earthStarting += 0.0015), 0);
    unknownOrbitRef.current?.rotation.set(0, (unknownStarting -= 0.0005), 0);
  });

  console.log("우주 랜더링 확인");
  return (
    <>
      <group ref={allOrbitRef} rotation={[0, 0, 0]}>
        <Sun
          focusAndView={(focus, name) => (
            setFocus(focus), viewTarget(name), setZoom(!zoomCheck.current)
          )}
        />
        <group ref={earthOrbitRef} rotation={[0, 0, 0]}>
          <Earth
            position={[550, 0, 0]}
            focusAndView={(focus, name) => (
              setFocus(focus), viewTarget(name), setZoom(!zoomCheck.current)
            )}
          />
        </group>
        <group ref={unknownOrbitRef}>
          <Unknown
            position={[1200, 0, 0]}
            focusAndView={(focus, name) => (
              setFocus(focus), viewTarget(name), setZoom(!zoomCheck.current)
            )}
          />
        </group>
        <axesHelper scale={500} />
        <SpaceCamera />
      </group>
    </>
  );
};
