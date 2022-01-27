import { useSphere } from "@react-three/cannon";
import React from "react";

export const Unknown = ({ ...props }) => {
  const [earthRef, earthApi] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position: props.position,
    //rotation: [10, 10, 10],
    args: [27],
  }));
  console.log("unknown");
  return (
    <>
      <mesh ref={earthRef}>
        <sphereGeometry args={[27]} />
        <meshNormalMaterial />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[props.position[0] - 5, props.position[0] + 5, 100]}
        />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};
