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
import { TapPlanet } from "../../interface/Infos/TapPlanet";
import { LeftInfoBox } from "../../interface/Infos/LeftInfoBox";
import { OrbitLine } from "../OrbitLine";
import { UnknownModel } from "./UnknownModel";
import { effectSound } from "../../../hooks/stores/effectSound";
import { planetDamageCalculation } from "../../../hooks/damageCalculation";

let unknownR = 0;
let unknownPname = null;
let unknownEffects;

export const Unknown = ({ position, control }) => {
  let onTimer;
  const html = useRef();
  const infoRef = useRef();
  const BS = useRef();

  const argsSize = planetStore.getState().size;
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

  const collisionWorldPosition = new Vector3();
  const [unknownRef, unknownApi] = useSphere(() => ({
    mass: 1,
    type: "Static",
    args: [argsSize["small"]],
    onCollide: (e) => {
      planetDamageCalculation(2, e.body.name);
      const data = planetStore.getState().planetDurability;

      if (data[2].durability <= 0) {
        effectSound.getState().plantEx.action();
        delete boundingStore.getState().fighter.friendly[unknownPname];
        delete planetStore.getState().planetResources[unknownPname];
        planetStore.setState((state) => (state.planetDurability[2].ON = false));
      }
    },
  }));

  if (unknownPname === null) {
    unknownPname = PlanetNameSelect();
    unknownEffects = EffectSelect(argsSize["small"]);
  }

  const timer = () => {
    onTimer = setTimeout(() => {
      html.current.style.display = "block";
    }, 300);
  };

  useFrame(() => {
    if (BS.current.geometry.boundingSphere) {
      unknownRef.current.getWorldPosition(BS.current.geometry.boundingSphere.center);
      boundingStore.getState().fighter.friendly = {
        ...fighter.friendly,
        [unknownPname]: BS.current.geometry.boundingSphere,
      };
      BS.current.getWorldPosition(collisionWorldPosition);
      unknownApi.position.copy(collisionWorldPosition);
    }

    unknownApi.rotation.set(0, (unknownR += 0.01), 0);

    if (tap?.current === false) {
      html.current.style.display = "none";
      screenStore.setState({ tapCheck: true });
    }
  });

  return (
    <>
      <group position={position} dispose={null}>
        <Html ref={html}>
          <TapPlanet planet={unknownPname} />
        </Html>
        <Html ref={infoRef} center distanceFactor={10000}>
          <LeftInfoBox planet={unknownPname} />
        </Html>
        <Html>
          <PlanetDurabilityBar num={2} name={"planet"} d={500} />
        </Html>
        <mesh ref={BS} />
        <mesh
          onClick={(e) => {
            planetStore.setState({
              selectPlanet: {
                name: unknownPname,
                type: "얼음형",
                size: argsSize["small"],
                position: collisionWorldPosition,
                main: false,
                effect: unknownEffects,
              },
            });
            control(unknownPname);
          }}
          onPointerDown={(e) => {
            timer();
          }}
          onPointerUp={(e) => {
            clearTimeout(onTimer);
          }}>
          <sphereGeometry args={[150]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <UnknownModel unknownEffects={unknownEffects} />
      </group>
      <OrbitLine args={[position[0] - 5, position[0] + 5, 100]} />
    </>
  );
};
