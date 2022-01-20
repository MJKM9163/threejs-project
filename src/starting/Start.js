import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import SpaceShip from "../models/spaceShip";
import { useStore } from "../hooks/useStore";
import { useCylinder } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";

function SpaceShipMove() {
  const spaceShipMove = useStore((state) => state.spaceShipMove);
  return spaceShipMove;
}

export const Start = () => {
  const setMove = useStore((state) => state.setSpaceShipMove);
  const spaceShipMove = useStore((state) => state.spaceShipMove);
  const setSpaceShipRotation = useStore((state) => state.setSpaceShipRotation);
  const spaceShipRotation = useStore((state) => state.spaceShipRotation);
  const ref = useRef();

  ref.current?.position.set(
    spaceShipMove[0],
    spaceShipMove[1],
    spaceShipMove[2]
  );
  ref.current?.rotation.set(
    spaceShipRotation[0],
    spaceShipRotation[1],
    spaceShipRotation[2]
  );

  let a = 0.25;
  let b = 1.25;

  let roX = 0.005;

  // useFrame(() => {
  //   // console.log(a);

  //   setMove(spaceShipMove[0] - a, spaceShipMove[1] - b, spaceShipMove[2] - b);
  //   setSpaceShipRotation(
  //     spaceShipRotation[0] - roX,
  //     spaceShipRotation[1],
  //     spaceShipRotation[2]
  //   );
  // });

  console.log(ref.current?.position);

  const { nodes, materials } = useGLTF("/spaceShip/scene.gltf");

  return (
    <>
      <group ref={ref} scale={0.1} dispose={null}>
        <group position={[0, 0, 0]} rotation={[-Math.PI / 1 - 0.025, -0.2, -0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.Space_ship}
          />
        </group>
      </group>
    </>
  );
};
