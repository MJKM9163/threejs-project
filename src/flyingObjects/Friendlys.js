import React, { useEffect, useRef } from "react";
import { boundingStore } from "../hooks/stores/boundingStore";
import { BasicFighter } from "./fighters/BasicFighter";

export const Friendlys = () => {
  const num = useRef();
  const friendlyNum = boundingStore.getState().friendlyNum;
  useEffect(() => {
    console.log(friendlyNum);
  }, []);
  return (
    <group ref={num}>
      {friendlyNum.map((item, index) => (
        <BasicFighter
          key={item + index}
          num={index + 1}
          position={[1000, 0, -4500 + index * -800]}
          rotation={[0, 0, 0]}
          args={300}
          scale={25}
        />
      ))}
    </group>
  );
};
