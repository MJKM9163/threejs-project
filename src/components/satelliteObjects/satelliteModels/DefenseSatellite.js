import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

let defenseSatelliteOption = {
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

export function DefenseSatellite({ position, num }) {
  const { nodes, materials } = useGLTF("/DefenseSatellite/scene.gltf");

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position,
    args: [100],
  }));

  useFrame(() => {
    api.rotation.set(0, (defenseSatelliteOption[num].R += 0.01), 0);
  });

  return (
    <group ref={ref} scale={1} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -200, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 100, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Cube_beacon_0.geometry} material={materials.beacon} />
          </group>
          <group position={[0, 200, 110.71]} rotation={[-Math.PI / 2, 0, 0]} scale={18.59}>
            <mesh geometry={nodes.Sphere_eye_0.geometry} material={materials.material} />
          </group>
          <group
            position={[-18.89, 240.18, 59.49]}
            rotation={[-2.61, -0.25, 0.16]}
            scale={[84.47, 84.47, 64.79]}>
            <mesh geometry={nodes.Cylinder002_cables_0.geometry} material={materials.cables} />
          </group>
          <group position={[60.71, 152.15, 49.54]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Cube001_plates_0.geometry} material={nodes.Cube001_plates_0.material} />
          </group>
          <group position={[60.86, 318.53, 49.47]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Cube002_plates_0.geometry} material={nodes.Cube002_plates_0.material} />
          </group>
          <group position={[-60.73, 318.34, 49.65]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Cube003_plates_0.geometry} material={nodes.Cube003_plates_0.material} />
          </group>
          <group position={[-60.63, 152.15, 49.62]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Cube006_plates_0.geometry} material={nodes.Cube006_plates_0.material} />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/DefenseSatellite/scene.gltf");
