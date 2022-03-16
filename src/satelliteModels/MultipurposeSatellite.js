import React from "react";
import { useGLTF } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";

export function MultipurposeSatellite({ ...props }) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position: [0, 5000, 0],
    args: [100],
  }));

  const { nodes, materials } = useGLTF("/multipurposeSatellite/scene.gltf");
  return (
    <group ref={ref} scale={100} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={nodes.defaultMaterial.material} />
          <mesh geometry={nodes.defaultMaterial_1.geometry} material={nodes.defaultMaterial_1.material} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/multipurposeSatellite/scene.gltf");
