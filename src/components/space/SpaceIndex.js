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

  const zoomCheck = useRef(useStore.getState().zoom);
  const orbitHide = useRef(useStore.getState().orbitHide);
  const resources = useRef(planetStore.getState().planetResources);

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
      // 탭 만들기
      planetStore.setState({
        planetResources: {
          ...resources.current,
          [name]: {
            develop: true,
            hide: !resources.current[name].hide,
            resources: resources.current[name].resources,
          },
        },
      });
    } else {
      useStore.setState({ focus: focus });
      useStore.setState({ type: type });
      useStore.setState({ selectSize: size });
      useStore.setState({ zoom: !zoomCheck.current });
      useStore.setState({ orbitHide: !orbitHide.current });
      // if () {
      //   screenStore.setState({
      //     awaitHide: {
      //       ...awaitHide.current,
      //       [awaitHide.current.map((item) => item)]: true,
      //     },
      //   });
      // }

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
