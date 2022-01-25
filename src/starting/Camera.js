import React, { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";

export const Camera = ({ ...props }) => {
  const camRef = useRef();

  return (
    <PerspectiveCamera
      makeDefault
      ref={camRef}
      position={props.position}
      far={8000}
      fov={60}
      near={3}
    />
  );
};
