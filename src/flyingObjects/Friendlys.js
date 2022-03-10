import React, { useEffect, useRef } from "react";
import { boundingStore } from "../hooks/stores/boundingStore";
import { BasicFighter } from "./fighters/BasicFighter";

export const Friendlys = () => {
  const num = useRef();
  //const friendlyNum = boundingStore.getState().friendlyNum;
  const friendlyNum = boundingStore((state) => state.friendlyNum);

  return (
    <group ref={num}>
      {friendlyNum.map((item, index) => (
        <BasicFighter
          key={item + index}
          num={index + 1}
          position={[1500, 0, -4000 + index * -800]}
          rotation={[0, 0, 0]}
          args={300}
          scale={25}
        />
      ))}
    </group>
  );
};
