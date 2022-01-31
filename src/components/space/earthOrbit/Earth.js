import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { EffectSelect } from "../../../hooks/EffectSelect";
import { useStore } from "../../../hooks/useStore";
import { OrbitLine } from "../OrbitLine";

let a = 0;

export const Earth = ({ SetUp, ...props }) => {
  const argsSize = useRef(useStore.getState().size);
  const orbitHide = useRef(useStore.getState().orbitHide);

  const earthWorldPosition = new Vector3();
  const [earthRef, earthApi] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position: props.position,
    args: [argsSize.current["middle"]],
  }));
  useEffect(() => {
    useStore.subscribe((state) => {
      orbitHide.current = state.orbitHide;
    });
  });

  useFrame(() => {
    earthApi.rotation.set(0, (a += 0.01), 0);
    earthRef.current?.getWorldPosition(earthWorldPosition);
  });
  useStore.setState({ earthEffect: EffectSelect(argsSize.current["middle"]) });

  console.log("earth 랜더링 확인");
  return (
    <>
      <mesh
        ref={earthRef}
        onClick={(e) => {
          SetUp(
            earthWorldPosition,
            "지구",
            "지구형",
            e.object.geometry.parameters.radius
          );
          useStore.setState({ orbitHide: !orbitHide.current });
        }}
      >
        <sphereGeometry args={[argsSize.current["middle"]]} />
        <meshNormalMaterial />
        <axesHelper scale={500} />
      </mesh>
      <OrbitLine args={[props.position[0] - 5, props.position[0] + 5, 100]} />
    </>
  );
};
