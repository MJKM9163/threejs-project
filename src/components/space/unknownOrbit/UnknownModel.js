import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { EffectModelSelect } from "../../../hooks/EffectModelSelect";
import { planetStore } from "../../../hooks/stores/planetStore";

let unknownRY = 0;
let unknownRZ = 0;

export const UnknownModel = ({ unknownEffects }) => {
  const { nodes, materials } = useGLTF("/unknown/scene.gltf");
  const check = planetStore((state) => state.planetDurability);
  const unknownRef = useRef();
  const unknownModels = EffectModelSelect(unknownEffects[0], unknownEffects[1]);

  useFrame(() => {
    unknownRef.current.rotation.set(0, (unknownRY += 0.005), (unknownRZ -= 0.007));
  });

  return (
    <group>
      {check[2].D <= 0 ? null : (
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={[70]}>
              <mesh
                receiveShadow
                geometry={nodes.Sphere_Material002_0.geometry}
                material={materials["Material.002"]}
              />
            </group>
          </group>
          <group ref={unknownRef}>
            {unknownModels.map((model, index) => (
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
