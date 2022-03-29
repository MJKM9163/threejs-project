import { useSphere } from "@react-three/cannon";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { PlanetDurabilityBar } from "../../../hooks/DurabilityBar";
import { EffectSelect } from "../../../hooks/EffectSelect";
import { PlanetNameSelect } from "../../../hooks/planetNameSelect";
import { boundingStore } from "../../../hooks/stores/boundingStore";
import { planetStore } from "../../../hooks/stores/planetStore";
import { screenStore } from "../../../hooks/stores/screenStore";
import { useStore } from "../../../hooks/stores/useStore";
import { TapPlanet } from "../../interface/Infos/TapPlanet";
import { LeftInfoBox } from "../../interface/Infos/LeftInfoBox";
import { OrbitLine } from "../OrbitLine";
import { EarthModel } from "./EarthModel";

let earthPname = null;
let eartheffects;

export const Earth = ({ SetUp, ...props }) => {
  let onTimer;
  const tapRef = useRef();
  const infoRef = useRef();
  const BS = useRef();

  const argsSize = useRef(useStore.getState().size);
  const leftInfoOnOff = useRef(screenStore.getState().leftInfoOnOff);
  const tap = useRef(screenStore.getState().tapCheck);
  const fighter = boundingStore.getState().fighter; //임시 저장소

  useEffect(() => {
    screenStore.subscribe(
      (state) => (leftInfoOnOff.current = state.leftInfoOnOff),
      (state) => state
    );
  });
  useEffect(() => {
    screenStore.subscribe(
      (state) => (tap.current = state.tapCheck),
      (state) => state
    );
  });

  const timer = () => {
    onTimer = setTimeout(() => {
      tapRef.current.style.display = "block";
    }, 300);
  };

  const collisionWorldPosition = new Vector3();
  const [earthRef, earthApi] = useSphere(() => ({
    mass: 0,
    type: "Static",
    args: [argsSize.current["middle"]],
    onCollide: (e) => {
      const data = planetStore.getState().planetDurability;
      if (e.body.name === "enemybasic") {
        data[1].D -= 20;
        planetStore.setState({ planetDurability: [...data] });
      }
      if (data[1].D <= 0) {
        //effectSound.getState().fighter.FlightExplosionSound.action();
        data[1] = false;
        delete planetStore.getState().fighter.friendly[earthPname];
        planetStore.setState({ planetDurability: [...data] });
      }
    },
  }));

  if (earthPname === null) {
    earthPname = PlanetNameSelect();
    eartheffects = EffectSelect(argsSize.current["middle"]);
  }

  useFrame(() => {
    if (BS.current.geometry.boundingSphere) {
      earthRef.current.getWorldPosition(BS.current.geometry.boundingSphere.center);
      boundingStore.getState().fighter.friendly = {
        ...fighter.friendly,
        [earthPname]: BS.current.geometry.boundingSphere,
      };
      BS.current.getWorldPosition(collisionWorldPosition);
      earthApi.position.copy(collisionWorldPosition);
    }

    if (tap?.current === false) {
      tapRef.current.style.display = "none";
    }
  });

  console.log("earth 랜더링 확인");
  return (
    <>
      <group position={props.position} dispose={null}>
        <Html ref={tapRef}>
          <TapPlanet planet={earthPname} />
        </Html>
        <Html ref={infoRef} center distanceFactor={10000}>
          <LeftInfoBox planet={earthPname} />
        </Html>
        <Html>
          <PlanetDurabilityBar num={1} name={"planet"} d={500} />
        </Html>
        <mesh ref={BS} />
        <mesh
          onClick={(e) => {
            SetUp(collisionWorldPosition, earthPname, "지구형", argsSize.current["middle"], eartheffects);
          }}
          onPointerDown={(e) => {
            timer();
          }}
          onPointerUp={(e) => {
            clearTimeout(onTimer);
          }}>
          <sphereGeometry args={[300]} />
          <meshBasicMaterial transparent opacity={0.5} />
        </mesh>
        <EarthModel eartheffects={eartheffects} />
        <axesHelper scale={500} />
      </group>
      <OrbitLine args={[props.position[0] - 5, props.position[0] + 5, 100]} />
    </>
  );
};
