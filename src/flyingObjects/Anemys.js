import React, { useEffect, useRef } from "react";
import { boundingStore } from "../hooks/stores/boundingStore";
import EnemyFighter from "./fighters/enemyFighter";

export const Anemys = () => {
  const num = useRef();
  const enemyNum = boundingStore.getState().enemyNum;
  useEffect(() => {
    console.log(enemyNum);
  }, []);

  return (
    <group ref={num}>
      {enemyNum.map((item, index) => (
        <EnemyFighter
          key={item + index}
          num={index + 1}
          position={[2500 + index * -1800, 0, -4000]}
          rotation={[0, 0, 0]}
          args={300}
          scale={25}
        />
      ))}
    </group>
  );
};
