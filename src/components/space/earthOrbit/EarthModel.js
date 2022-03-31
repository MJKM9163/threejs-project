import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { EffectModelSelect } from "../../../hooks/EffectModelSelect";
import { planetStore } from "../../../hooks/stores/planetStore";
import { screenStore } from "../../../hooks/stores/screenStore";

let earthRY = 0;
let earthRZ = 0;

export const EarthModel = ({ eartheffects }) => {
  const { nodes, materials } = useGLTF("/mainPlanet/scene.gltf");
  const force = useGLTF("/sphereForce/scene.gltf");
  const check = planetStore((state) => state.planetDurability);
  const pCCheck = screenStore((state) => state.planetCurtainCheck);
  const effectRef = useRef();
  const effectModels = EffectModelSelect(eartheffects[0], eartheffects[1]);

  useFrame(() => {
    effectRef.current.rotation.set(0, (earthRY += 0.005), (earthRZ -= 0.007));
  });

  return (
    <group>
      {check[1].D <= 0 ? null : (
        <group>
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
                </group>
              ))}
            </group>
          </group>
          {pCCheck === true && check[1].ON === true ? (
            <group scale={4} dispose={null}>
              <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                  <group position={[8307.84, 3486.8, 4515.44]} rotation={[Math.PI, 0.78, 2.8]} />
                  <mesh geometry={force.nodes.Sphere_6_M_0.geometry} material={force.materials.material} />
                  <mesh geometry={force.nodes.Sphere_6_A_1.geometry} material={force.materials.material_1} />
                </group>
              </group>
            </group>
          ) : null}
        </group>
      )}
    </group>
  );
};

useGLTF.preload("/sphereForce/scene.gltf");
