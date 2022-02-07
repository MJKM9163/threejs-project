import { useSphere } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { EffectSelect } from "../../../hooks/EffectSelect";
import { PlanetNameSelect } from "../../../hooks/planetNameSelect";
import { useStore } from "../../../hooks/stores/useStore";
import { OrbitLine } from "../OrbitLine";

let a = 0;
let Pname = null;
let effects = [];

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

  if (Pname === null) {
    Pname = PlanetNameSelect();
    effects.push(EffectSelect(argsSize.current["small"]));
  }

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
                    Pname,
                    "얼음형",
                    argsSize.current["small"],
                    ...effects
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
