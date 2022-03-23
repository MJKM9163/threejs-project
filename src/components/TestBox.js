import React, { useEffect } from "react";
import { useBox } from "@react-three/cannon";
import { Vector3 } from "three";

export const TestBox = ({ ...props }) => {
  const vec = new Vector3();
  const [ref, api] = useBox(() => ({
    mass: 1,
    type: "Dynamic",
    args: [100, 100, 100],
    position: [0, 5000, -8000],
    rotation: [0, 0, 0],
  }));

  useEffect(() => {
    api.position.subscribe((p) => {
      console.log(p);
      api.applyForce(
        vec
          .set(...p)
          .normalize()
          .multiplyScalar(-5.5)
          .toArray(),
        [10, 0, 1]
      );
    });
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
