import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { EffectModelSelect } from "../../../hooks/EffectModelSelect";
import { planetStore } from "../../../hooks/stores/planetStore";
import { screenStore } from "../../../hooks/stores/screenStore";

let unknownRY = 0;
let unknownRZ = 0;

export const UnknownModel = ({ unknownEffects }) => {
  const { nodes, materials } = useGLTF("/space/iceSphere/scene.gltf");
  const force = useGLTF("/space/sphereForce/scene.gltf");
  const check = planetStore((state) => state.planetDurability);
  const pCCheck = screenStore((state) => state.planetCurtainCheck);
  const effectRef = useRef();
  const unknownModels = EffectModelSelect(unknownEffects[0], unknownEffects[1]);

  useFrame(() => {
    effectRef.current.rotation.set(0, 0, (unknownRZ -= 0.007));
  });

  return (
    <group>
      {check[2].durability <= 0 ? null : (
        <group>
          <group dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <group rotation={[Math.PI / 2, 0, 0]}>
                <group position={[407.62, 590.39, -100.55]} rotation={[1.89, 0.88, -2.05]} scale={100}>
                  <group rotation={[Math.PI / 2, 0, 0]} />
                </group>
                <group position={[735.89, 495.83, 692.58]} rotation={[Math.PI, 0.76, 2.68]} scale={100} />
                <group rotation={[-Math.PI / 2, 0, 0]} scale={75}>
                  <mesh geometry={nodes.Sphere__0.geometry} material={materials["Scene_-_Root"]} />
                </group>
              </group>
            </group>
            <group ref={effectRef}>
              {unknownModels.map((model, index) => (
                <group rotation={[Math.PI / 1, 0.3, -Math.PI / 2]} scale={0.5} key={index}>
                  {model}
                </group>
              ))}
            </group>
          </group>
          {pCCheck === true && check[2].ON === true ? (
            <group scale={3} dispose={null}>
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
