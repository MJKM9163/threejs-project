import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { effectSound } from "../../hooks/stores/effectSound";
import { boundingStore } from "../../hooks/stores/boundingStore";

let a = 0;

export default function EnemyFighter({ args, position, rotation, num }) {
  const group = useRef();
  const move = useRef();
  const BS = useRef();
  const { clock } = useThree();
  const fighter = boundingStore.getState().fighter;
  const { nodes, materials } = useGLTF("flyingObjects/enemyFighter/scene.gltf");

  const [collideRef, collideApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 100,
    position,
    rotation,
    args: [args],
    onCollide: (e) => {
      //effectSound.getState().fighter.FlightExplosionSound.action();
    },
  }));

  useEffect(() => {
    console.log(boundingStore.getState().fighter);
    let boundingArray = boundingStore.getState().fighter.friendly;
  }, []);

  useFrame(() => {
    collideApi.velocity.set(Math.sin(clock.getElapsedTime() * 5) * -500, 0, 0); // 가속!
    if (BS.current.geometry.boundingSphere) {
      collideRef.current.getWorldPosition(BS.current.geometry.boundingSphere.center);
      boundingStore.getState().fighter.enemy = { ...fighter.enemy, ["전투기" + num]: BS.current.geometry.boundingSphere };
      //console.log(fighter);
    }
  });

  return (
    <group ref={collideRef} dispose={null}>
      <axesHelper scale={1500} />
      <mesh ref={move}>
        <sphereGeometry args={[args + 50]} />
        <meshStandardMaterial wireframe opacity={0.5} transparent color={"green"} />
      </mesh>
      <mesh ref={BS}>
        <sphereGeometry args={[args + 50]} />
        <meshStandardMaterial wireframe opacity={0} transparent />
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
