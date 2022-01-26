import React, { useEffect } from "react";
import { useBox } from "@react-three/cannon";
import { Vector3 } from "three";

export const TestBox = ({ ...props }) => {
  const vec = new Vector3();
  const [ref, api] = useBox(() => ({
    mass: 1,
    type: "Dynamic",
    args: [10, 10, 10],
    position: [0, 5, 0],
    rotation: [0, 0, 0],
  }));

  useEffect(() => {
    api.position.subscribe((p) =>
      api.applyForce(
        vec
          .set(...p)
          .normalize()
          .multiplyScalar(-5.5)
          .toArray(),
        [1, 0, 1]
      )
    );
  }, [api]);

  return (
    <>
      <mesh ref={ref}>
        <boxGeometry args={[10, 10, 10]} />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};
