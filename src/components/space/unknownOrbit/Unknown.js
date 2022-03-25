import { useSphere } from "@react-three/cannon";
import { Html, useGLTF } from "@react-three/drei";
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
import { TapPlanet } from "../../../interface/CanvasInHTML/TapPlanet";
import { LeftInfoBox } from "../../../interface/LeftInfo/LeftInfoBox";
import { OrbitLine } from "../OrbitLine";

let unknownR = 0;
let unknownPname = null;
let unknownEffects = [];

export const Unknown = ({ SetUp, ...props }) => {
  let onTimer;
  const html = useRef();
  const infoRef = useRef();
  const core = useRef();
  const { nodes, materials } = useGLTF("/unknown/scene.gltf");

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

  const collisionWorldPosition = new Vector3();
  const CollisionRef = useRef();
  const [unknownRef, unknownApi] = useSphere(() => ({
    mass: 1,
    type: "Static",
    args: [argsSize.current["small"]],
    onCollide: (e) => {
      const data = planetStore.getState().planetDurability;
      if (e.body.name === "enemybasic") {
        data[2].D -= 20;
        planetStore.setState({ planetDurability: [...data] });
      }
    },
  }));

  if (unknownPname === null) {
    unknownPname = PlanetNameSelect();
    unknownEffects.push(EffectSelect(argsSize.current["small"]));
  }

  const timer = () => {
    onTimer = setTimeout(() => {
      html.current.style.display = "block";
    }, 300);
  };

  useFrame(() => {
    if (core.current.geometry.boundingSphere) {
      unknownRef.current.getWorldPosition(core.current.geometry.boundingSphere.center);
      boundingStore.getState().fighter.friendly = {
        ...fighter.friendly,
        [unknownPname]: core.current.geometry.boundingSphere,
      };
    }

    unknownApi.rotation.set(0, (unknownR += 0.01), 0);
    CollisionRef.current?.getWorldPosition(collisionWorldPosition);
    unknownApi.position.copy(collisionWorldPosition);

    if (tap?.current === false) {
      html.current.style.display = "none";
      screenStore.setState({ tapCheck: true });
    }
    if (leftInfoOnOff?.current === false) {
      infoRef.current.style.display = "none";
      screenStore.getState().leftInfoOnOff = "false";
    } else if (leftInfoOnOff?.current === true) {
      infoRef.current.style.display = "block";
      screenStore.getState().leftInfoOnOff = "true";
    }
  });

  console.log("unknown 랜더링 확인");
  return (
    <>
      <group position={props.position} dispose={null}>
        <Html ref={html}>
          <TapPlanet planet={unknownPname} />
        </Html>
        <Html ref={infoRef} center distanceFactor={10000}>
          <LeftInfoBox planet={unknownPname} />
        </Html>
        <Html>
          <PlanetDurabilityBar num={2} name={"planet"} d={500} />
        </Html>
        <mesh ref={CollisionRef} />
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[argsSize.current["small"], argsSize.current["small"], argsSize.current["small"]]}>
              <mesh
                ref={core}
                receiveShadow
                onClick={(e) => {
                  SetUp(
                    collisionWorldPosition,
                    unknownPname,
                    "얼음형",
                    argsSize.current["small"],
                    ...unknownEffects
                  );
                }}
                onPointerDown={(e) => {
                  timer();
                }}
                onPointerUp={(e) => {
                  clearTimeout(onTimer);
                }}
                geometry={nodes.Sphere_Material002_0.geometry}
                material={materials["Material.002"]}
              />
            </group>
          </group>
        </group>
        <axesHelper scale={500} />
      </group>
      <OrbitLine args={[props.position[0] - 5, props.position[0] + 5, 100]} />
    </>
  );
};
