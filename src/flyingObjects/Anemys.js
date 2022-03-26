import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { boundingStore } from "../hooks/stores/boundingStore";
import { EnemyFighter } from "./fighters/enemyFighter";

const posRandomFun = () => {
  const pos = Math.floor(Math.random() * 2);
  if (pos === 1) {
    let posX = 5000;
    const posZ = Math.floor(Math.random() * (5000 - -5000) - 5000);
    return [posX, posZ];
  } else if (pos === 0) {
    let posX = -5000;
    const posZ = Math.floor(Math.random() * (5000 - -5000) - 5000);
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
  const enemyNum = boundingStore((state) => state.enemyNum);
  const { clock } = useThree();

  // useFrame(() => {
  //   if (clock.elapsedTime > 5 && levelCheck[1] === false) {
  //     levelCheck[1] = true;
  //     enemyNum[0] = true;
  //     boundingStore.setState({ enemyNum: [...enemyNum] });
  //   } else if (clock.elapsedTime > 10 && levelCheck[2] === false) {
  //     //const data = boundingStore.getState().enemyNum;
  //     levelCheck[2] = true;
  //     for (let i = 0; i < 3; i++) {
  //       enemyNum[i] = true;
  //     }
  //     boundingStore.setState({ enemyNum: [...enemyNum] });
  //   }
  // });
  return (
    <group ref={num}>
      {enemyNum.map((item, index) =>
        item === true ? (
          <EnemyFighter
            key={index}
            num={index}
            position={[posRandomFun()[0], 0, posRandomFun()[1]]}
            rotation={[0, 0, 0]}
            scale={25}
          />
        ) : (
          false
        )
      )}
    </group>
  );
};
