import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { useStore } from "../hooks/useStore";

const StartSpaceShip = () => {
  const rotationRef = useRef();
  const positionRef = useRef();
  const { nodes, materials } = useGLTF("/spaceShip/scene.gltf");
  const setSpaceShipRotation = useStore((state) => state.setSpaceShipRotation);
  const spaceShipRotation = useStore((state) => state.spaceShipRotation);

  positionRef.current?.position.set(300, 1500, 1500);

  let roZ = 0.009;

  useFrame(() => {
    setSpaceShipRotation(
      spaceShipRotation[0] - roZ,
      spaceShipRotation[1],
      spaceShipRotation[2] + (roZ + 0.01)
    );
    rotationRef.current?.rotation.set(
      spaceShipRotation[0],
      spaceShipRotation[1],
      spaceShipRotation[2]
    );
  });

  return (
    <group ref={positionRef}>
      <group ref={rotationRef} scale={0.1} dispose={null}>
        <group position={[0, 0, 0]} rotation={[-Math.PI / 1, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.Space_ship}
          />
        </group>
      </group>
    </group>
  );
};

export default StartSpaceShip;
