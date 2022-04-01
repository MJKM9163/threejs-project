import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { boundingStore } from "../hooks/stores/boundingStore";
import { EnemyFighter } from "./fighters/EnemyFighter";

const posRandomFun = () => {
  const pos = Math.floor(Math.random() * 2);
  if (pos === 1) {
    let posX = 8000;
    const posZ = Math.floor(Math.random() * (8000 - -8000) - 8000);
    return [posX, posZ];
  } else if (pos === 0) {
    let posX = -8000;
    const posZ = Math.floor(Math.random() * (8000 - -8000) - 8000);
    return [posX, posZ];
  }
};

const levelCheck = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};

export const Anemys = () => {
  const num = useRef();
  const enemyLive = boundingStore((state) => state.enemyLive);
  const enemyData = boundingStore((state) => state.enemyData);
  const { clock } = useThree();

  useFrame(() => {
    if (clock.elapsedTime > 320 && levelCheck[1] === false) {
      levelCheck[1] = true;
      enemyLive[0] = enemyData.basic;
      boundingStore.setState({ enemyLive: [...enemyLive] });
    } else if (clock.elapsedTime > 550 && levelCheck[2] === false) {
      levelCheck[2] = true;
      for (let i = 0; i < 3; i++) {
        enemyLive[i] = enemyData.basic;
      }
      boundingStore.setState({ enemyLive: [...enemyLive] });
    } else if (clock.elapsedTime > 800 && levelCheck[3] === false) {
      levelCheck[3] = true;
      for (let i = 0; i < 5; i++) {
        enemyLive[i] = enemyData.basic;
      }
      boundingStore.setState({ enemyLive: [...enemyLive] });
    } else if (clock.elapsedTime > 1130 && levelCheck[4] === false) {
      levelCheck[4] = true;
      for (let i = 0; i < 8; i++) {
        enemyLive[i] = enemyData.basic;
      }
      boundingStore.setState({ enemyLive: [...enemyLive] });
    } else if (clock.elapsedTime > 1400 && levelCheck[5] === false) {
      levelCheck[5] = true;
      for (let i = 0; i < 12; i++) {
        enemyLive[i] = enemyData.basic;
      }
      boundingStore.setState({ enemyLive: [...enemyLive] });
    }
  });
  return (
    <group ref={num}>
      {enemyLive.map((item, index) =>
        item.type === "공격함" ? (
          <EnemyFighter
            key={index}
            num={index}
            position={[posRandomFun()[0], 0, posRandomFun()[1]]}
            rotation={[0, 0, 0]}
            scale={25}
            adjust={item.adjust}
          />
        ) : (
          false
        )
      )}
    </group>
  );
};
