import { useSphere } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useStore } from "../../../hooks/useStore";
import { OrbitLine } from "../OrbitLine";

let a = 0;

export const Unknown = ({ SetUp, ...props }) => {
  const { nodes, materials } = useGLTF("/unknown/scene.gltf");

  const argsSize = useRef(useStore.getState().size);

  const unknownWorldPosition = new Vector3();
  const [unknownRef, unknownApi] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position: props.position,
    args: [argsSize.current["small"]],
  }));

  useFrame(() => {
    unknownApi.rotation.set(0, (a += 0.01), 0);
    unknownRef.current?.getWorldPosition(unknownWorldPosition);
  });

  console.log("unknown 랜더링 확인");
  return (
    <>
      <group ref={unknownRef} {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[
                argsSize.current["small"],
                argsSize.current["small"],
                argsSize.current["small"],
              ]}
            >
              <mesh
                receiveShadow
                onClick={(e) => {
                  SetUp(
                    unknownWorldPosition,
                    "알 수 없음",
                    "얼음형",
                    argsSize.current["small"]
                  );
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
