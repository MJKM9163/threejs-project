import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { boundingStore } from "../hooks/stores/boundingStore";
import { EnemyFighter, MemoEnemyFighter } from "./fighters/enemyFighter";

export const Anemys = () => {
  const num = useRef();
  //const enemyNum = boundingStore.getState().enemyNum;
  const enemyNum = boundingStore((state) => state.enemyNum);

  console.log("적 비행기 컴포넌트");
  return (
    <group ref={num}>
      {enemyNum.map((item, index) => (
        <MemoEnemyFighter
          key={item + index}
          num={index + 1}
          position={[1800 + index * -1800, 0, -3500]}
          mPos={[1800 + index * -1800 + 500, 0, -3500]}
          rotation={[0, 0, 0]}
          args={300}
          scale={25}
        />
      ))}
    </group>
  );
};
