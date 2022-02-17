import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { effectStore } from "../../hooks/stores/effectStore";
import { planetStore } from "../../hooks/stores/planetStore";
import { screenStore } from "../../hooks/stores/screenStore";
import { useStore } from "../../hooks/stores/useStore";
import { MemoLeftInfo } from "../../interface/Construction/LeftInfo";
import { MemoProduction } from "../../interface/Construction/Production";
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
      for (let i = 0; i < Object.keys(resources.current).length; i++) {
        planetStore.getState().planetResources[Object.keys(resources.current)[i]].hide = true;
        console.log("클릭");
      }
      planetStore.getState().planetResources[name].hide = false;
      console.log("클릭2");
      planetStore.setState({
        planetResources: {
          ...resources.current,
        },
      });
      console.log(planetStore.getState().planetResources);
      console.log("클릭3");
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
  let production = screenStore.getState().production;

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
      {/* <Html
        center
        distanceFactor={10000}
        style={{ backgroundColor: "MistyRose", position: "absolute", top: 10 }}>
        <div className="flexBox" style={{ backgroundColor: "none" }}>
          <MemoLeftInfo planetName={planetName.current} resources={resources.current} />
          <MemoProduction production={production} />
        </div>
      </Html> */}
    </group>
  );
};
