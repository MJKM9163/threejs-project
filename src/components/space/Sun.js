import { useSphere } from "@react-three/cannon";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { useStore } from "../../hooks/useStore";

let a = 0.5;

export const Sun = ({ SetUp, ...props }) => {
  const argsSize = useRef(useStore.getState().size);

  const { nodes, materials } = useGLTF("/sun/scene.gltf");
  const [sunRef, sunApi] = useSphere(() => ({
    mass: 100,
    type: "Static",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    args: [argsSize.current["large"]],
  }));

  useFrame(() => {
    sunApi.rotation.set(0, (a += 0.003), 0);
  });
  console.log("태양 랜더링 확인");

  return (
    <>
      <group
        ref={sunRef}
        scale={argsSize.current["large"] / 10}
        {...props}
        dispose={null}
      >
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                onClick={(e) => {
                  SetUp(
                    e.object.position,
                    "태양",
                    "주계열성",
                    argsSize.current["large"]
                  );
                }}
                geometry={nodes.UnstableStarCore_1_0.geometry}
                material={materials.material_1}
              />
            </group>
            <group
              name="UnstableStarref"
              rotation={[-Math.PI / 2, 0, 0]}
              scale={1.03}
            >
              <mesh
                geometry={nodes.UnstableStarref_2_0.geometry}
                material={materials.material}
              />
            </group>
          </group>
        </group>
        <axesHelper scale={30} />
      </group>
    </>
  );
};
