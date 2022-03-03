import React from "react";
import { BasicFighter } from "./fighters/BasicFighter";
import EnemyFighter from "./fighters/enemyFighter";
import { MemoTtest, Ttest } from "./fighters/Ttest";

export const FlyingIndex = () => {
  return (
    <group>
      <BasicFighter position={[0, 0, 0]} rotation={[0, 0, 0]} args={500} scale={25} />
      <Ttest />
      {/* <EnemyFighter position={[-1000, 0, -1000]} rotation={[0, 0, 0]} args={500} scale={25} /> */}
    </group>
  );
};
