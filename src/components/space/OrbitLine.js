import React from "react";
import { screenStore } from "../../hooks/stores/screenStore";

export const OrbitLine = ({ ...props }) => {
  const hide = screenStore((state) => state.orbit);

  return (
    <>
      {hide ? null : (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={props.args} />
          <meshBasicMaterial opacity={"1"} />
        </mesh>
      )}
    </>
  );
};
