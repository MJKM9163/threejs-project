import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { planetStore } from "../../hooks/stores/planetStore";
import { screenStore } from "../../hooks/stores/screenStore";
import { Earth } from "./earthOrbit/Earth";
import { Sun } from "./Sun";
import { Unknown } from "./unknownOrbit/Unknown";

let earthStarting = 0.0;
let unknownStarting = 0.0;
export const SpaceIndex = () => {
  const earthOrbitRef = useRef();
  const unknownOrbitRef = useRef();

  const check1 = planetStore((state) => state.planetDurability[0].ON);
  const check2 = planetStore((state) => state.planetDurability[1].ON);
  const check3 = planetStore((state) => state.planetDurability[2].ON);

  const control = (name) => {
    if (planetStore.getState().planetResources[name] !== undefined) {
      screenStore.setState((state) => (state.productionControl = true));
    } else {
      screenStore.setState({ zoom: true });
      screenStore.setState({ orbit: true });
    }
  };

  useFrame(() => {
    earthOrbitRef.current?.rotation.set(0, (earthStarting += 0.0015), 0);
    unknownOrbitRef.current?.rotation.set(0, (unknownStarting -= 0.0005), 0);
  });

  return (
    <group>
      {check1 === true ? <Sun /> : null}
      <group ref={earthOrbitRef}>
        {check2 === true ? <Earth position={[3000, 0, 0]} control={control} /> : null}
      </group>
      <group ref={unknownOrbitRef}>
        {check3 === true ? <Unknown position={[5400, 0, 0]} control={control} /> : null}
      </group>
    </group>
  );
};
