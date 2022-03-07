import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { effectSound } from "../../hooks/stores/effectSound";
import { boundingStore } from "../../hooks/stores/boundingStore";
import { Box3 } from "three";

let a = -150;
let b = 0;
let boundingArray;

let detectArray = [];

export const BasicFighter = ({ args, ...props }) => {
  const sphere = useRef();
  const move = useRef();
  const BS = useRef();
  const { nodes, materials } = useGLTF("flyingObjects/basicFighter/scene.gltf");
  const { raycaster, scene, clock } = useThree();

  const [collideRef, collideApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 1,
    position: [0, 0, -3000],
    rotation: [0, 0, 0],
    args: [args],
    onCollide: (e) => {
      //effectSound.getState().fighter.FlightExplosionSound.action();
      //console.log("아군 비행기 충돌!");
      collideApi.position.set(0, 0, -3000);
      a = 0;
    },
    onCollideEnd: () => {
      //console.log("충돌 끝");
    },
  }));
  useEffect(() => {
    console.log(boundingStore.getState().fighter);
    boundingArray = boundingStore.getState().fighter.enemy;
  }, []);

  let boundingFun = () => {
    for (let key in boundingArray) {
      //console.log(key);
      //console.log(boundingArray[key].current);
      const check = BS.current.geometry.boundingSphere?.intersectsSphere(boundingArray[key]);
      if (check === true) {
        //collideApi.velocity.copy(boundingArray[key].current.geometry.boundingSphere.center);
        return check;
      }
    }
  };

  useFrame(() => {
    collideApi.velocity.set(0, 0, -900); // 가속!
    if (BS.current.geometry.boundingSphere) {
      collideRef.current.getWorldPosition(BS.current.geometry.boundingSphere.center);
    }

    if (boundingFun()) {
      move.current.material.color.set("yellow");
    } else {
      move.current.material.color.set("blue");
    }
  });
  console.log(collideRef);
  console.log("비행체");
  return (
    <group ref={collideRef} dispose={null}>
      <mesh ref={move}>
        <sphereGeometry args={[args + 50]} />
        <meshStandardMaterial wireframe opacity={0.5} transparent color={"green"} />
      </mesh>
      <mesh ref={BS}>
        <sphereGeometry args={[args + 50]} />
        <meshStandardMaterial wireframe opacity={0} transparent />
      </mesh>
      <group rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={20}>
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
