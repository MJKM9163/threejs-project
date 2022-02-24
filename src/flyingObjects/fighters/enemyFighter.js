import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";

export default function EnemyFighter({ args, ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("flyingObjects/enemyFighter/scene.gltf");

  const [hitBoxRef, hitBoxApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 0,
    args: [args],
  }));

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Northstar_L_chi_bang} />
          <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.Northstar_L_bo_li} />
          <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.Northstar_L_ji_cang} />
          <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.Northstar_L_ji_shen} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("flyingObjects/enemyFighter/scene.gltf");
