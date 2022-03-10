import { useFrame } from "@react-three/fiber";
import React, { memo, useState } from "react";
import { boundingStore } from "../../hooks/stores/boundingStore";
import { MemoExplosive } from "./missiles/Explosive";
import { Pulse } from "./missiles/Pulse";

export const ProjectileIndex = () => {
  const [we, ee] = useState(false);
  //let explosiveNum = boundingStore.getState().explosiveNum;
  const explosiveNum = boundingStore((state) => state.explosiveNum);
  console.log(explosiveNum.length);
  // useFrame(() => {
  //   ee(!we);
  // });

  return (
    <group>
      {/* {explosiveNum.map((pos, index) => (
        <MemoExplosive key={index} num={index} />
      ))} */}
      {explosiveNum.length > 3 ? explosiveNum.length > 6 ? <MemoExplosive num={1} /> : null : <MemoExplosive num={1} />}
      <MemoExplosive num={1} />
      <MemoExplosive num={1} />
      <MemoExplosive num={1} />
      <MemoExplosive num={1} />
      <MemoExplosive num={1} />
      <MemoExplosive num={1} />
      <MemoExplosive num={1} />
      <MemoExplosive num={1} />
      {/* {explosiveNum.map((pos, index) => (
        <mesh key={index}>
          <boxGeometry args={[1000, 1000 * (index + 1), 1000]} />
          <meshBasicMaterial />
        </mesh>
      ))} */}
      {/* <MemoExplosive num={0} /> */}
      {}
      <Pulse />
    </group>
  );
};

export const MemoProjectileIndex = memo(ProjectileIndex);
