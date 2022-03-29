import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

let dustExtractorOption = {
  0: { R: 0, D: 100 },
  1: { R: 0, D: 100 },
  2: { R: 0, D: 100 },
  3: { R: 0, D: 100 },
  4: { R: 0, D: 100 },
  5: { R: 0, D: 100 },
  6: { R: 0, D: 100 },
  7: { R: 0, D: 100 },
  8: { R: 0, D: 100 },
  9: { R: 0, D: 100 },
};

export function DustExtractor({ position, num }) {
  const { nodes, materials } = useGLTF("/dustExtractor/scene.gltf");

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position,
    args: [100],
  }));

  useFrame(() => {
    api.rotation.set(0, (dustExtractorOption[num].R += 0.01), 0);
  });

  return (
    <group ref={ref} scale={1} dispose={null}>
      <group position={[0.15, -180.05, -0.27]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={0.21}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={30.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 50]}>
            <mesh geometry={nodes.lantern002_low_emit_0.geometry} material={materials.emit} />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/dustExtractor/scene.gltf");
