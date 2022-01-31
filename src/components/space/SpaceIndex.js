import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../hooks/useStore";
import { SpaceCamera } from "./controls/SpaceCamera";
import { Earth } from "./earthOrbit/Earth";
import { Sun } from "./Sun";
import { Unknown } from "./unknownOrbit/Unknown";

let earthStarting = 0.0;
let unknownStarting = 0.0;
export const SpaceIndex = () => {
  const allOrbitRef = useRef();
  const earthOrbitRef = useRef();
  const unknownOrbitRef = useRef();

  let zoomCheck = useRef(useStore.getState().zoom);
  useEffect(() => {
    useStore.subscribe((state) => {
      zoomCheck.current = state.zoom;
    });
  });

  useFrame(() => {
    earthOrbitRef.current?.rotation.set(0, (earthStarting += 0.0015), 0);
    unknownOrbitRef.current?.rotation.set(0, (unknownStarting -= 0.0005), 0);
  });

  const SetUp = (focus, name, type, selectSize) => {
    useStore.setState({ focus: focus });
    useStore.setState({ name: name });
    useStore.setState({ type: type });
    useStore.setState({ zoom: !zoomCheck.current });
    useStore.setState({ selectSize: selectSize });
  };
  console.log("우주 랜더링 확인");
  return (
    <>
      <group ref={allOrbitRef} rotation={[0, 0, 0]}>
        <Sun SetUp={SetUp} />
        <group ref={earthOrbitRef} rotation={[0, 0, 0]}>
          <Earth position={[850, 0, 0]} SetUp={SetUp} />
        </group>
        <group ref={unknownOrbitRef}>
          <Unknown position={[1500, 0, 0]} SetUp={SetUp} />
        </group>
        <SpaceCamera />
      </group>
    </>
  );
};
