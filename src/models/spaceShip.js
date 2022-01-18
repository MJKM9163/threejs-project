import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function SpaceShip({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/spaceShip/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.Space_ship}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/spaceShip/scene.gltf");
