import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { boundingStore } from "../../hooks/stores/boundingStore";
import { Explosive } from "./missiles/Explosive";
import { Pulse } from "./missiles/Pulse";

export const ProjectileIndex = () => {
  //const explosiveNum = boundingStore.getState().explosiveNum;
  const explosiveNum = boundingStore((state) => state.explosiveNum);
  //console.log(explosiveNum);

  return (
    <group>
      {explosiveNum[0] === undefined
        ? null
        : explosiveNum.map((pos, index) => <Explosive key={index} num={index + 1} position={pos.MPos} tPos={pos.TPos} />)}
      <Pulse />
    </group>
  );
};
