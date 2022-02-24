import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

let a = 1;
let b = 0;
export const BasicFighter = ({ args, ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("flyingObjects/basicFighter/scene.gltf");

  const [hitBoxRef, hitBoxApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 0,
    position: [1000, 0, -1000],
    rotation: [0, Math.PI / 2, 0],
    args: [args],
  }));

  useFrame(() => {
    //hitBoxApi.rotation.set(0, 0, 0);
    hitBoxApi.velocity.set(0, 0, 0); // 가속!
    //hitBoxApi.position.set((b -= 0.05), 0, 0);
    //group.current?.position.set((a += 0.1), 0, 0);
    //console.log(ref.current?.position);
  });
  console.log(hitBoxRef.current?.scale);
  console.log(hitBoxRef);
  console.log(hitBoxApi);
  console.log(group);

  console.log("비행체");
  const [color, setColor] = useState("hotpink");
  return (
    <group ref={hitBoxRef} {...props} dispose={null}>
      <mesh>
        <sphereGeometry args={[args]} />
        <meshStandardMaterial wireframe opacity={0.5} transparent color={color} />
      </mesh>
      <group rotation={[-Math.PI / 2, 0, 0]}>
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
