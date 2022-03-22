import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { boundingStore } from "../hooks/stores/boundingStore";
import { EnemyFighter, MemoEnemyFighter } from "./fighters/enemyFighter";

export const Anemys = () => {
  const num = useRef();
  const enemyNum = boundingStore((state) => state.enemyNum);

  return (
    <group ref={num}>
      {enemyNum.map((item, index) =>
        item === true ? (
          <EnemyFighter
            key={index}
            num={index}
            position={[1800, 0, -3500 + index * -1800]}
            rotation={[0, 0, 0]}
            args={0}
            scale={25}
          />
        ) : null
      )}
    </group>
  );
};
