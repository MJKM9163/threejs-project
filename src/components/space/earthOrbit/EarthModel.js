import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { EffectModelSelect } from "../../../hooks/EffectModelSelect";
import { planetStore } from "../../../hooks/stores/planetStore";
import { screenStore } from "../../../hooks/stores/screenStore";

//let earthRY = 0;
let earthRZ = 0;

export const EarthModel = ({ eartheffects }) => {
  const { nodes, materials } = useGLTF("/space/mainPlanet/scene.gltf");
  const force = useGLTF("/space/sphereForce/scene.gltf");
  const check = planetStore((state) => state.planetDurability);
  const pCCheck = screenStore((state) => state.planetCurtainCheck);
  const effectRef = useRef();
  const effectModels = EffectModelSelect(eartheffects[0], eartheffects[1]);

  useFrame(() => {
    effectRef.current.rotation.set(0, 0, (earthRZ += 0.005));
  });

  return (
    <group>
      {check[1].durability <= 0 ? null : (
        <group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={2.5}>
            <mesh castShadow geometry={nodes.mesh_0.geometry} material={materials.Material__25} />
            <mesh geometry={nodes.mesh_1.geometry} material={materials.Material__65} />
            <group ref={effectRef}>
              {effectModels.map((model, index) => (
                <group rotation={[Math.PI / 1, 0.3, -Math.PI / 2]} scale={0.5} key={index}>
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

useGLTF.preload("/space/sphereForce/scene.gltf");
