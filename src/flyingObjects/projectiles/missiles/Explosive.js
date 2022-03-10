import React, { memo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import { boundingStore } from "../../../hooks/stores/boundingStore";

export const Explosive = ({ controll, api, pos, num }) => {
  //const explosiveNum = boundingStore((state) => state.explosiveNum);
  const explosiveNum = boundingStore.getState().explosiveNum;
  const { nodes, materials } = useGLTF("flyingObjects/projectiles/explosive/scene.gltf");

  const [ref, missilesApi] = useBox(() => ({
    type: "Dynamic",
    mass: 1,
    position: [0, 2000, 0],
    args: [10, 10, 700],
  }));

  let moveFun = () => {
    let xPos = (explosiveNum[num].MPos.x - explosiveNum[num].TPos.x) * -1;
    let zPos = (explosiveNum[num].MPos.z - explosiveNum[num].TPos.z) * -1;

    return [xPos, zPos];
  };

  useFrame(() => {});
  //   console.log("각 미사일");
  // });
  // useFrame(({ clock }) => {
  //   // clock.autoStart = false;
  //   let [X, Z] = moveFun();
  //   missilesApi.velocity.set(X / 2, 0, Z / 2);
  //   //console.log(clock);
  // });
  console.log("미사일");
  // ref={ref}
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
