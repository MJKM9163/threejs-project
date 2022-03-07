import React from "react";
import { BasicFighter } from "./fighters/BasicFighter";

export const Friendlys = () => {
  return (
    <group>
      <BasicFighter position={[0, 0, 0]} rotation={[0, 0, 0]} args={300} scale={25} />
    </group>
  );
};
