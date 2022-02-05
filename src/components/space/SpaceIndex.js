import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { effectStore } from "../../hooks/effectStore";
import { useStore } from "../../hooks/useStore";
import { Earth } from "./earthOrbit/Earth";
import { Sun } from "./Sun";
import { Unknown } from "./unknownOrbit/Unknown";

let earthStarting = 0.0;
let unknownStarting = 0.0;
export const SpaceIndex = () => {
  const earthOrbitRef = useRef();
  const unknownOrbitRef = useRef();

  const zoomCheck = useRef(useStore.getState().zoom);
  const orbitHide = useRef(useStore.getState().orbitHide);
  useEffect(() => {
    useStore.subscribe(
      (state) => (zoomCheck.current = state.zoom),
      (state) => state.zoom
    );
  });
  useEffect(() => {
    useStore.subscribe(
      (state) => (orbitHide.current = state.orbitHide),
      (state) => state.orbitHide
    );
  });

  useFrame(() => {
    earthOrbitRef.current?.rotation.set(0, (earthStarting += 0.0015), 0);
    unknownOrbitRef.current?.rotation.set(0, (unknownStarting -= 0.0005), 0);
  });

  const SetUp = (focus, name, type, size, effects) => {
    useStore.setState({ focus: focus });
    useStore.setState({ name: name });
    useStore.setState({ type: type });
    useStore.setState({ selectSize: size });
    useStore.setState({ zoom: !zoomCheck.current });
    useStore.setState({ orbitHide: !orbitHide.current });
    if (type === "주계열성") {
      useStore.setState({ mainPlanet: true });
    } else {
      effectStore.setState({ effects: effects });
    }
  };

  console.log("우주 랜더링 확인");
  return (
    <>
      <Sun SetUp={SetUp} />
      <group ref={earthOrbitRef}>
        <Earth position={[2200, 0, 0]} SetUp={SetUp} />
      </group>
      <group ref={unknownOrbitRef}>
        <Unknown position={[3400, 0, 0]} SetUp={SetUp} />
      </group>
    </>
  );
};
