import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { EffectModelSelect } from "../../../hooks/EffectModelSelect";
import { planetStore } from "../../../hooks/stores/planetStore";

let earthRY = 0;
let earthRZ = 0;

export const EarthModel = ({ eartheffects }) => {
  const { nodes, materials } = useGLTF("/mainPlanet/scene.gltf");
  const check = planetStore((state) => state.planetDurability);
  const effectRef = useRef();
  const effectModels = EffectModelSelect(eartheffects[0], eartheffects[1]);

  useFrame(() => {
    effectRef.current.rotation.set(0, (earthRY += 0.005), (earthRZ -= 0.007));
  });

  return (
    <group>
      {check[1].D <= 0 ? null : (
        <group rotation={[-Math.PI / 2, 0, 0]} scale={1.9}>
          <mesh castShadow geometry={nodes.mesh_0.geometry} material={materials.Material__25} />
          <mesh geometry={nodes.mesh_1.geometry} material={materials.Material__65} />
          <group ref={effectRef}>
            {effectModels.map((model, index) => (
              <group
                rotation={[Math.PI / 1, 0.3, -Math.PI / 2]}
                position={[150, 50, 0]}
                scale={0.5}
                key={index}>
                {model}
                <axesHelper scale={500} />
              </group>
            ))}
          </group>
        </group>
      )}
    </group>
  );
};
