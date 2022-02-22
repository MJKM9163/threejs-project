import { useSphere } from "@react-three/cannon";
import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { screenStore } from "../../hooks/stores/screenStore";
import { useStore } from "../../hooks/stores/useStore";
import { TapPlanet } from "../../interface/CanvasInHTML/TapPlanet";
import { LeftInfoBox } from "../../interface/LeftInfo/LeftInfoBox";

let a = 0.5;
let onTimer;

export const Sun = ({ SetUp, ...props }) => {
  const html = useRef();
  const infoRef = useRef();

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

  const { nodes, materials } = useGLTF("/sun/scene.gltf");
  const [sunRef, sunApi] = useSphere(() => ({
    mass: 100,
    type: "Static",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    args: [argsSize.current["large"]],
  }));

  const timer = () => {
    onTimer = setTimeout(() => {
      html.current.style.display = "block";
    }, 300);
  };
  useFrame(() => {
    sunApi.rotation.set(0, (a += 0.003), 0);

    if (tap?.current === false) {
      html.current.style.display = "none";
    }
    if (leftInfoOnOff?.current === false) {
      infoRef.current.style.display = "none";
    } else if (leftInfoOnOff?.current === true) {
      infoRef.current.style.display = "block";
    }
  });

  console.log("태양 랜더링 확인");
  return (
    <>
      <group ref={sunRef} scale={argsSize.current["large"] / 10} {...props} dispose={null}>
        <Html ref={html}>
          <TapPlanet planet={"태양"} />
        </Html>
        <Html ref={infoRef} center distanceFactor={10000}>
          <LeftInfoBox planet={"태양"} />
        </Html>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                onClick={(e) => {
                  SetUp(e.object.position, "태양", "주계열성", argsSize.current["large"]);
                }}
                onPointerDown={(e) => {
                  timer();
                }}
                onPointerUp={(e) => {
                  clearTimeout(onTimer);
                }}
                geometry={nodes.UnstableStarCore_1_0.geometry}
                material={materials.material_1}
              />
            </group>
            <group name="UnstableStarref" rotation={[-Math.PI / 2, 0, 0]} scale={1.03}>
              <mesh geometry={nodes.UnstableStarref_2_0.geometry} material={materials.material} />
            </group>
          </group>
        </group>
        <axesHelper scale={30} />
      </group>
    </>
  );
};
