import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useRaycastAny, useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { effectSound } from "../../hooks/stores/effectSound";
import { OBB } from "three/examples/jsm/math/OBB";

let a = -150;
let b = 0;

export const BasicFighter = ({ args, ...props }) => {
  const box = useRef();
  const { nodes, materials } = useGLTF("flyingObjects/basicFighter/scene.gltf");

  const [hitBoxRef, hitBoxApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 1,
    position: [800, 0, -1000],
    rotation: [0, Math.PI / 2, 0],
    args: [args],
    onCollide: (e) => {
      effectSound.getState().fighter.FlightExplosionSound.action();
      console.log("아군 비행기 충돌!");
      //hitBoxApi.position.set(800, 0, -1000);
      a = 0;
    },
    onCollideEnd: () => {
      console.log("충돌 끝");
    },
  }));

  useFrame(() => {
    hitBoxApi.velocity.set(a, 0, 0); // 가속!
  });

  const ref = useRef();
  useLayoutEffect(() => {
    ref.current.geometry.computeBoundingBox();
    ref.current.geometry.boundingBox.applyMatrix4(hitBoxRef.current.matrixWorld);

    console.log(ref);
    console.log(ref.current.geometry.boundingBox);
    const t = new OBB().fromBox3(ref.current.geometry.boundingBox);
    console.log(t);
    ref.current.userData.obb = new OBB(); // 여기서 부터 시작
  }, []);
  console.log("비행체");
  return (
    <group ref={hitBoxRef} dispose={null}>
      <mesh ref={ref}>
        <sphereGeometry args={[650]} />
        <meshStandardMaterial wireframe opacity={0.5} transparent color={"green"} />
      </mesh>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={20}>
        <mesh geometry={nodes["wave-material"].geometry} material={nodes["wave-material"].material} />
        <group scale={0.75}>
          <mesh geometry={nodes["wave-material_1"].geometry} material={nodes["wave-material_1"].material} />
        </group>
        <group scale={0.75}>
          <mesh geometry={nodes["wave-material_2"].geometry} material={nodes["wave-material_2"].material} />
        </group>
        <group scale={0.75}>
          <mesh geometry={nodes["wave-material_3"].geometry} material={nodes["wave-material_3"].material} />
        </group>
        <group position={[-2.66, -3.49, -1.8]} rotation={[0, Math.PI / 6, Math.PI]} scale={[0.75, 0.75, 0.75]}>
          <mesh geometry={nodes["landing-gear-material"].geometry} material={nodes["landing-gear-material"].material} />
        </group>
        <group position={[-2.66, -3.49, -1.87]} rotation={[0, Math.PI / 6, 0]} scale={[0.75, 0.75, 0.75]}>
          <mesh geometry={nodes["landing-gear-material_1"].geometry} material={nodes["landing-gear-material_1"].material} />
        </group>
        <group position={[0, -0.94, -2.09]} scale={0.75}>
          <mesh geometry={nodes["landing-gear-material_2"].geometry} material={nodes["landing-gear-material_2"].material} />
        </group>
        <group position={[2.65, -3.49, -1.8]} rotation={[0, -Math.PI / 6, 0]} scale={[0.75, 0.75, 0.75]}>
          <mesh geometry={nodes["landing-gear-material_3"].geometry} material={nodes["landing-gear-material_3"].material} />
        </group>
        <group position={[2.65, -3.49, -1.87]} rotation={[0, -Math.PI / 6, 0]} scale={[0.75, 0.75, 0.75]}>
          <mesh geometry={nodes["landing-gear-material_4"].geometry} material={nodes["landing-gear-material_4"].material} />
        </group>
        <mesh geometry={nodes["glow-material"].geometry} material={materials.glow} />
        <group position={[-6.59, -9.24, 0.97]} rotation={[0, 0.55, 0]}>
          <mesh geometry={nodes.Object_23.geometry} material={nodes.Object_23.material} />
        </group>
        <group position={[6.59, -9.24, 0.97]} rotation={[0, -0.55, 0]}>
          <mesh geometry={nodes.Object_25.geometry} material={nodes.Object_25.material} />
        </group>
      </group>
    </group>
  );
};
useGLTF.preload("flyingObjects/basicFighter/scene.gltf");
