import { useSphere } from "@react-three/cannon";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { PlanetDurabilityBar } from "../../../hooks/DurabilityBar";
//import { EffectModelSelect } from "../../../hooks/EffectModelSelect"; 잠시 주석처리
import { EffectSelect } from "../../../hooks/EffectSelect";
import { PlanetNameSelect } from "../../../hooks/planetNameSelect";
import { boundingStore } from "../../../hooks/stores/boundingStore";
import { planetStore } from "../../../hooks/stores/planetStore";
import { screenStore } from "../../../hooks/stores/screenStore";
import { useStore } from "../../../hooks/stores/useStore";
import { TapPlanet } from "../../../interface/CanvasInHTML/TapPlanet";
import { LeftInfoBox } from "../../../interface/LeftInfo/LeftInfoBox";
import { OrbitLine } from "../OrbitLine";

let earthR = 0;
let earthPname = null;
let eartheffects;
let effectsModels;

// let b = 0;
// let c = -250;

export const Earth = ({ SetUp, ...props }) => {
  let onTimer;
  const effectRef = useRef();
  const tapRef = useRef();
  const infoRef = useRef();
  const core = useRef();
  const { nodes, materials } = useGLTF("/mainPlanet/scene.gltf");

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
  const CollisionRef = useRef();
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
    },
  }));

  if (earthPname === null) {
    earthPname = PlanetNameSelect();
    eartheffects = EffectSelect(argsSize.current["middle"]);
  }

  //const effectModels = EffectModelSelect(effects[0], effects[1]); 잠시 주석처리
  console.log(boundingStore.getState().fighter);
  useFrame(() => {
    if (core.current.geometry.boundingSphere) {
      earthRef.current.getWorldPosition(core.current.geometry.boundingSphere.center);
      boundingStore.getState().fighter.friendly = {
        ...fighter.friendly,
        [earthPname]: core.current.geometry.boundingSphere,
      };
    }

    effectRef.current.rotation.set(0, earthR - 0.002, earthR - 0.003);
    CollisionRef.current?.getWorldPosition(collisionWorldPosition);
    earthApi.position.copy(collisionWorldPosition);

    if (tap?.current === false) {
      tapRef.current.style.display = "none";
    }
    if (leftInfoOnOff?.current === false) {
      infoRef.current.style.display = "none";
    } else if (leftInfoOnOff?.current === true) {
      infoRef.current.style.display = "block";
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
        <mesh ref={CollisionRef} />
        <group rotation={[-Math.PI / 2, 0, 0]} scale={1.9}>
          <mesh
            ref={core}
            castShadow
            onClick={(e) => {
              SetUp(collisionWorldPosition, earthPname, "지구형", argsSize.current["middle"], eartheffects);
            }}
            onPointerDown={(e) => {
              timer();
            }}
            onPointerUp={(e) => {
              clearTimeout(onTimer);
            }}
            geometry={nodes.mesh_0.geometry}
            material={materials.Material__25}
          />
          <mesh geometry={nodes.mesh_1.geometry} material={materials.Material__65} />
          <group ref={effectRef}>
            {/* {effectModels.map((model, index) => ( 잠시 주석처리
              <group
                rotation={[Math.PI / 1, 0.3, -Math.PI / 2]}
                position={[150, 50, 0]}
                scale={0.5}
                key={index}
              >
                {model}
                <axesHelper scale={500} />
              </group>
            ))} */}
          </group>
        </group>
        <axesHelper scale={500} />
      </group>
      <OrbitLine args={[props.position[0] - 5, props.position[0] + 5, 100]} />
    </>
  );
};
