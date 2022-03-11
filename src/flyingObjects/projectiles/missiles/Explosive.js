import React, { memo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";

export const Explosive = ({ mPos, tPos, num, pos }) => {
  const { nodes, materials } = useGLTF("flyingObjects/projectiles/explosive/scene.gltf");
  console.log(pos);
  const [ref, missilesApi] = useBox(() => ({
    type: "Dynamic",
    mass: 1,
    position: [...Object.values(pos.MPos)],
    args: [100, 100, 700],
  }));

  let moveFun = () => {
    let xPos = (mPos.x - tPos.x) * 1;
    let zPos = (mPos.z - tPos.z) * 1;

    return [xPos, zPos];
  };

  useFrame(() => {
    let [X, Z] = moveFun();
    missilesApi.velocity.set(X / 2, 0, Z / 2);
  });
  console.log("미사일");

  return (
    <group ref={ref} dispose={null}>
      <group position={[-200, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[387.34, -175.97, 15.53]} rotation={[1.47, 0.76, 0.07]} />
        <mesh geometry={nodes.Material2.geometry} material={materials.auto_13} />
        <mesh geometry={nodes.Material2_1.geometry} material={materials.auto_14} />
        <mesh geometry={nodes.Material2_2.geometry} material={materials.auto_16} />
        <lineSegments geometry={nodes.Material2_3.geometry} material={nodes.Material2_3.material} />
      </group>
    </group>
  );
};

export const MemoExplosive = memo(Explosive);
