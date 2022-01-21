import React, { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";

export const Camera = () => {
  const camRef = useRef();

  return (
    <PerspectiveCamera
      makeDefault
      ref={camRef}
      position={[250, 1700, 1700]}
      far={8000}
      fov={60}
      near={3}
    />
  );
};
