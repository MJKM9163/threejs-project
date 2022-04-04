import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

let eRY = 0;
let eRZ = 0;

export default function NanoFactory() {
  const { nodes, materials } = useGLTF("/space/spaceStation/scene.gltf");
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.set(0, (eRY += 0.005), (eRZ -= 0.007));
  });

  return (
    <group scale={1} ref={ref} position={[-500, -50, 0]} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
        <mesh geometry={nodes.mesh_1.geometry} material={nodes.mesh_1.material} />
        <mesh geometry={nodes.mesh_2.geometry} material={nodes.mesh_2.material} />
        <mesh geometry={nodes.mesh_3.geometry} material={nodes.mesh_3.material} />
        <mesh geometry={nodes.mesh_4.geometry} material={nodes.mesh_4.material} />
        <mesh geometry={nodes.mesh_5.geometry} material={nodes.mesh_5.material} />
        <mesh geometry={nodes.mesh_6.geometry} material={nodes.mesh_6.material} />
        <mesh geometry={nodes.mesh_7.geometry} material={materials.PtexMtl1} />
      </group>
    </group>
  );
}

useGLTF.preload("/spaceStation/scene.gltf");
