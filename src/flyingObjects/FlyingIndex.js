import React from "react";
import { BasicFighter } from "./fighters/BasicFighter";
import EnemyFighter from "./fighters/enemyFighter";

export const FlyingIndex = () => {
  return (
    <group>
      <BasicFighter position={[0, 0, 0]} rotation={[0, 0, 0]} args={500} scale={25} />
      <EnemyFighter position={[-1000, 0, -1000]} rotation={[0, 0, 0]} args={500} scale={25} />
    </group>
  );
};
