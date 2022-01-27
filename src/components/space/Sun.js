import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useState, useMemo } from "react";
import { useStore } from "../../hooks/useStore";

let a = 0.5;

export const Sun = ({ focusAndView }) => {
  const setZoom = useStore((state) => state.setZoom);
  //const [tt, setTT] = useState(false);
  const [sunRef, sunApi] = useSphere(() => ({
    mass: 100,
    type: "Static",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    args: [100],
  }));

  console.log("sun component");
  useFrame(() => {
    sunApi.rotation.set(0, (a += 0.01), 0);
  });

  return (
    <>
      <mesh
        ref={sunRef}
        onClick={(e) => {
          focusAndView(e.object.position, "sun");
          setZoom(true);
        }}
      >
        <sphereGeometry args={[100]} />
        <meshNormalMaterial />
        <axesHelper scale={300} />
      </mesh>
    </>
  );
};
