import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Ring() {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/space/ring/scene.gltf");
  const { actions } = useAnimations(animations, group);
  //console.log(animations);
  return (
    <group ref={group} dispose={null}>
      <group rotation={[0, 0, 0]} scale={0.8}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              receiveShadow
              geometry={nodes["Saturn_Rings_Material_#63_0"].geometry}
              material={materials.Material_63}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/space/ring/scene.gltf");
