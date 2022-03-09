import React, { useEffect, useRef } from "react";
import { boundingStore } from "../hooks/stores/boundingStore";
import EnemyFighter from "./fighters/enemyFighter";

export const Anemys = () => {
  const num = useRef();
  const enemyNum = boundingStore.getState().enemyNum;

  return (
    <group ref={num}>
      {enemyNum.map((item, index) => (
        <EnemyFighter
          key={item + index}
          num={index + 1}
          position={[1800 + index * -1800, 0, -3500]}
          rotation={[0, 0, 0]}
          args={300}
          scale={25}
        />
      ))}
    </group>
  );
};
