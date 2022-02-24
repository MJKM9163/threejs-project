import React from "react";
import { BasicFighter } from "./fighters/BasicFighter";
import EnemyFighter from "./fighters/enemyFighter";

export const FlyingIndex = () => {
  return (
    <group>
      <BasicFighter position={[800, 0, -1000]} rotation={[0, Math.PI / 2, 0]} args={18} scale={25} />
      <EnemyFighter position={[-800, 0, -1000]} rotation={[0, 0, 0]} args={1} scale={100} />
    </group>
  );
};
