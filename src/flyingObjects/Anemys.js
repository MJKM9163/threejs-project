import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { boundingStore } from "../hooks/stores/boundingStore";
import { EnemyFighter, MemoEnemyFighter } from "./fighters/enemyFighter";

export const Anemys = () => {
  const num = useRef();
  const enemyNum = boundingStore((state) => state.enemyNum);

  return (
    <group ref={num}>
      {enemyNum.map((item, index) => (
        <EnemyFighter
          key={index}
          num={index + 1}
          position={[1800, 0, -3500 + index * -1800]}
          mPos={[1800, 500, -3500 + index * -1800]}
          rotation={[0, 0, 0]}
          args={300}
          scale={25}
        />
      ))}
    </group>
  );
};
