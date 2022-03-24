import React, { useMemo } from "react";
import moveMap from "../images/moveMap.png";
import { screenStore } from "../hooks/stores/screenStore";
import { TextureLoader } from "three";

export const FlyingMoveField = () => {
  const field = new Array(1).fill(0);
  const flyingMoveMapCheck = screenStore((state) => state.flyingMoveMapCheck);
  const moveMap1 = useMemo(() => new TextureLoader().load(moveMap), []);
  return (
    <group>
      {flyingMoveMapCheck === true ? (
        <group>
          {field.map((zitem, zindex) => (
            <mesh
              key={"z" + zindex + "f"}
              position={[0, -10, 0]}
              rotation={[Math.PI / 0.66666, 0, 0]}
              onClick={(e) => {
                screenStore.setState({ flyingMovePos: e.point });
              }}>
              <planeGeometry args={[15000, 15000]} />
              <meshBasicMaterial color="#2d6279" map={moveMap1} attach="material" />
            </mesh>
          ))}
        </group>
      ) : null}
    </group>
  );
};
