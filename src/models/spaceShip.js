import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

export default function SpaceShip({ ...props }) {
  const { nodes, materials } = useGLTF("/spaceShip/scene.gltf");

  const [ref] = useCylinder(() => ({
    type: "Static",
    position: props.refP,
    rotation: props.refR,
    args: props.refA,
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group position={props.position} rotation={props.rotation}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.Space_ship}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/spaceShip/scene.gltf");
