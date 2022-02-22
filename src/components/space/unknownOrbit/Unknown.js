import { useSphere } from "@react-three/cannon";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { EffectSelect } from "../../../hooks/EffectSelect";
import { PlanetNameSelect } from "../../../hooks/planetNameSelect";
import { screenStore } from "../../../hooks/stores/screenStore";
import { useStore } from "../../../hooks/stores/useStore";
import { TapPlanet } from "../../../interface/CanvasInHTML/TapPlanet";
import { LeftInfoBox } from "../../../interface/LeftInfo/LeftInfoBox";
import { OrbitLine } from "../OrbitLine";

let onTimer;

let a = 0;
let Pname = null;
let effects = [];

export const Unknown = ({ SetUp, ...props }) => {
  const html = useRef();
  const infoRef = useRef();
  const { nodes, materials } = useGLTF("/unknown/scene.gltf");

  const argsSize = useRef(useStore.getState().size);
  const leftInfoOnOff = useRef(screenStore.getState().leftInfoOnOff);
  const tap = useRef(screenStore.getState().tapCheck);

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

  const unknownWorldPosition = new Vector3();
  const [unknownRef, unknownApi] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position: props.position,
    args: [argsSize.current["small"]],
  }));

  if (Pname === null) {
    Pname = PlanetNameSelect();
    effects.push(EffectSelect(argsSize.current["small"]));
  }

  const timer = () => {
    onTimer = setTimeout(() => {
      html.current.style.display = "block";
    }, 300);
  };

  useFrame(() => {
    unknownApi.rotation.set(0, (a += 0.01), 0);
    unknownRef.current?.getWorldPosition(unknownWorldPosition);

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
      <group ref={unknownRef} {...props} dispose={null}>
        <Html ref={html}>
          <TapPlanet planet={Pname} />
        </Html>
        <Html ref={infoRef} center distanceFactor={10000}>
          <LeftInfoBox planet={Pname} />
        </Html>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[argsSize.current["small"], argsSize.current["small"], argsSize.current["small"]]}>
              <mesh
                receiveShadow
                onClick={(e) => {
                  SetUp(unknownWorldPosition, Pname, "얼음형", argsSize.current["small"], ...effects);
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
