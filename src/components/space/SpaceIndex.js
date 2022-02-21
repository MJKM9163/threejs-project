import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { effectStore } from "../../hooks/stores/effectStore";
import { planetStore } from "../../hooks/stores/planetStore";
import { useStore } from "../../hooks/stores/useStore";
import { Earth } from "./earthOrbit/Earth";
import { Sun } from "./Sun";
import { Unknown } from "./unknownOrbit/Unknown";

let earthStarting = 0.0;
let unknownStarting = 0.0;
export const SpaceIndex = () => {
  const earthOrbitRef = useRef();
  const unknownOrbitRef = useRef();

  const planetName = useRef(useStore.getState().name);
  const resources = useRef(planetStore.getState().planetResources);

  useEffect(() => {
    useStore.subscribe(
      (state) => (planetName.current = state.name),
      (state) => state.name
    );
  });
  useEffect(() => {
    planetStore.subscribe(
      (state) => (resources.current = state.planetResources),
      (state) => state.planetResources
    );
  });

  useFrame(() => {
    earthOrbitRef.current?.rotation.set(0, (earthStarting += 0.0015), 0);
    unknownOrbitRef.current?.rotation.set(0, (unknownStarting -= 0.0005), 0);
  });

  const SetUp = (focus, name, type, size, effects) => {
    useStore.setState({ name: name });
    if (resources.current[name]?.develop === true) {
      for (let item in resources.current) {
        planetStore.getState().planetResources[item].hide = true;
      }
      planetStore.getState().planetResources[name].hide = false;

      planetStore.setState({
        planetResources: {
          ...resources.current,
        },
      });
    } else {
      useStore.setState({ focus: focus });
      useStore.setState({ type: type });
      useStore.setState({ selectSize: size });
      useStore.setState({ zoom: true }); // 행성을 두번 클릭 하지 않아서 제대로 작동함
      useStore.setState({ orbitHide: true });

      if (type === "주계열성") {
        useStore.setState({ mainPlanet: true });
      } else {
        effectStore.setState({ effects: effects });
      }
    }
  };

  console.log("우주 랜더링 확인");
  return (
    <group>
      <Sun SetUp={SetUp} />
      <group ref={earthOrbitRef}>
        <Earth position={[2200, 0, 0]} SetUp={SetUp} />
      </group>
      <group ref={unknownOrbitRef}>
        <Unknown position={[3400, 0, 0]} SetUp={SetUp} />
      </group>
    </group>
  );
};
