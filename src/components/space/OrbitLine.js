import React from "react";
import { useStore } from "../../hooks/stores/useStore";

export const OrbitLine = ({ ...props }) => {
  const hide = useStore((state) => state.orbitHide);

  console.log("궤도 선 랜더링");
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
