import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { effectSound } from "../../hooks/stores/effectSound";

let a = 0;
export default function EnemyFighter({ args, ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("flyingObjects/enemyFighter/scene.gltf");

  const [hitBoxRef, hitBoxApi] = useSphere(() => ({
    type: "Static",
    mass: 100,
    position: [-500, 0, -1000],
    rotation: [0, 0, 0],
    args: [args],
    onCollide: (e) => {
      //effectSound.getState().fighter.FlightExplosionSound.action();
      console.log("적 비행기 충돌!");
    },
  }));

  useFrame(() => {
    //hitBoxApi.rotation.set(0, 0, 0);
    hitBoxApi.velocity.set(0, 0, 0); // 가속!
    //group.current?.position.set((a += 0.1), 0, 0);
    //console.log(ref.current?.position);
  });

  return (
    <group ref={hitBoxRef} dispose={null}>
      <axesHelper scale={1500} />
      <mesh>
        <sphereGeometry args={[650]} />
        <meshStandardMaterial wireframe opacity={0.5} transparent />
      </mesh>
      <mesh>
        <sphereGeometry />
        <meshStandardMaterial wireframe opacity={0.5} transparent />
      </mesh>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Northstar_L_chi_bang} />
          <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.Northstar_L_bo_li} />
          <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.Northstar_L_ji_cang} />
          <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.Northstar_L_ji_shen} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("flyingObjects/enemyFighter/scene.gltf");
