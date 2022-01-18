import { useBox, useSphere } from "@react-three/cannon";
import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

const Character = ({ ...props }) => {
  const group = useRef();
  const [sphere] = useSphere(() => ({
    mass: 1,
    type: "Static",
    args: [0.5],
    position: [0, 8.5, 0],
    ...props,
  }));
  const { nodes, materials, animations } = useGLTF("Ybot/ybot.gltf");
  console.log(animations);
  const { actions } = useAnimations(animations, group);

  //useEffect(() => actions["mixamo.com"].play(), []);
  return (
    <>
      <group name="Main" {...props} dispose={null} scale={0.05}>
        <meshNormalMaterial color={"red"} />
      </group>
      <group name="Camera" ref={sphere} {...props} dispose={null}>
        <mesh>
          <sphereGeometry attach="geometry" args={[0.5]} />
          <meshStandardMaterial attach="material" color="red" />
        </mesh>
      </group>
      <group
        name="Model"
        ref={group}
        dispose={null}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.05}
      >
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.Alpha_Joints.geometry}
          material={materials.Alpha_Joints_MAT}
          skeleton={nodes.Alpha_Joints.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Alpha_Surface.geometry}
          material={materials.Alpha_Body_MAT}
          skeleton={nodes.Alpha_Surface.skeleton}
        />
      </group>
    </>
  );
};

export default Character;
useGLTF.preload("Ybot/ybot.gltf");
