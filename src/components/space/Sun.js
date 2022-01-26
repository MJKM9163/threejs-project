import { useSphere } from "@react-three/cannon";
import React from "react";

export const Sun = () => {
  const [sunRef, sunApi] = useSphere(() => ({
    mass: 100,
    type: "Static",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    args: [10],
  }));
  return (
    <>
      <mesh ref={sunRef}>
        <sphereGeometry args={[10]} />
      </mesh>
    </>
  );
};
