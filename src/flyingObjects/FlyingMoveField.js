import React, { useMemo } from "react";
import moveMap from "../images/moveMap.png";
import { screenStore } from "../hooks/stores/screenStore";
import { TextureLoader } from "three";

export const FlyingMoveField = () => {
  const flyingMoveMapCheck = screenStore((state) => state.flyingMoveMapCheck);
  const moveMap1 = useMemo(() => new TextureLoader().load(moveMap), []);

  return (
    <group>
      {flyingMoveMapCheck !== null ? (
        <mesh
          position={[0, -10, 0]}
          rotation={[Math.PI / 0.66666, 0, 0]}
          onClick={(e) => {
            console.log("클릭");
            const data = screenStore.getState().flyingMovePos;
            data[flyingMoveMapCheck] = e.point;
            screenStore.setState({ flyingMovePos: data });
          }}>
          <planeGeometry args={[15000, 15000]} />
          <meshBasicMaterial color="#2d6279" map={moveMap1} attach="material" />
        </mesh>
      ) : null}
    </group>
  );
};
