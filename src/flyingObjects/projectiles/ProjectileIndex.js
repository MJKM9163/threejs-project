import React, { useRef } from "react";
import { boundingStore } from "../../hooks/stores/boundingStore";
import { Explosive } from "./missiles/Explosive";
import { Pulse } from "./missiles/Pulse";

export const ProjectileIndex = () => {
  const num = useRef();
  //const explosiveNum = boundingStore.getState().explosiveNum;
  const explosiveNum = boundingStore((state) => state.explosiveNum);
  console.log(explosiveNum[0]);
  return (
    <group ref={num}>
      {explosiveNum.map((item, index) => (
        <Explosive key={index} num={index + 1} position={[...Object.values(item)]} />
      ))}
      <Pulse />
    </group>
  );
};
