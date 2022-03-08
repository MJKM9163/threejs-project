import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const Explosive = ({ position }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("flyingObjects/projectiles/explosive/scene.gltf");
  return (
    <group ref={group} position={position} dispose={null}>
      <group position={[-200, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[387.34, -175.97, 15.53]} rotation={[1.47, 0.76, 0.07]} />
        <mesh geometry={nodes.Material2.geometry} material={materials.auto_13} />
        <mesh geometry={nodes.Material2_1.geometry} material={materials.auto_14} />
        <mesh geometry={nodes.Material2_2.geometry} material={materials.auto_16} />
        <lineSegments geometry={nodes.Material2_3.geometry} material={nodes.Material2_3.material} />
      </group>
    </group>
  );
};

useGLTF.preload("flyingObjects/projectiles/explosive/scene.gltf");
