import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useStore } from "../../../hooks/useStore";
import { OrbitLine } from "../OrbitLine";

let a = 0;

export const Unknown = ({ SetUp, ...props }) => {
  const argsSize = useRef(useStore.getState().size);
  let orbitHide = useRef(useStore.getState().orbitHide);

  const unknownWorldPosition = new Vector3();
  const [unknownRef, unknownApi] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position: props.position,
    args: [argsSize.current["small"]],
  }));

  useEffect(() => {
    useStore.subscribe((state) => {
      orbitHide.current = state.orbitHide;
    });
  });

  useFrame(() => {
    unknownApi.rotation.set(0, (a += 0.01), 0);
    unknownRef.current?.getWorldPosition(unknownWorldPosition);
  });

  console.log("unknown 랜더링 확인");
  return (
    <>
      <mesh
        ref={unknownRef}
        onClick={(e) => {
          SetUp(
            unknownWorldPosition,
            "알 수 없음",
            "얼음형",
            e.object.geometry.parameters.radius
          );
          useStore.setState({ orbitHide: !orbitHide.current });
        }}
      >
        <sphereGeometry args={[argsSize.current["small"]]} />
        <meshNormalMaterial />
        <axesHelper scale={500} />
      </mesh>
      <OrbitLine args={[props.position[0] - 5, props.position[0] + 5, 100]} />
    </>
  );
};
