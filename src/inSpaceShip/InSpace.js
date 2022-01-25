import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function InSpaceShip({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/inSpaceShip/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.highpolywall11_Wall_Black_0.geometry}
            material={materials.Wall_Black}
          />
          <mesh
            geometry={nodes.highpolywall11_lambert1_0.geometry}
            material={materials.lambert1}
          />
          <mesh
            geometry={nodes.highpolywall11_Wall_Roof_White_0.geometry}
            material={materials.Wall_Roof_White}
          />
          <mesh
            geometry={nodes.highpolywall11_Wall_blue_0.geometry}
            material={materials.Wall_blue}
          />
          <mesh
            geometry={nodes.highpolywall11_Floor_and_vent_0.geometry}
            material={materials.Floor_and_vent}
          />
          <mesh
            geometry={nodes.highpolywall11_Floor_vent_0.geometry}
            material={materials.Floor_vent}
          />
          <mesh
            geometry={nodes.highpolywall11_Glass_0.geometry}
            material={materials.Glass}
          />
          <mesh
            geometry={nodes.highpolywall11_Vent_light_0.geometry}
            material={materials.Vent_light}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/inSpaceShip/scene.gltf");
