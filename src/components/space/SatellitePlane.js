import { useSphere } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { DoubleSide, Vector3 } from "three";
import { screenStore } from "../../hooks/stores/screenStore";
import { MultipurposeSatellite } from "../../satelliteModels/MultipurposeSatellite";

export const SatellitePlane = () => {
  const field = new Array(20).fill(0);
  const satelliteMapCheck = screenStore((state) => state.satelliteMapOnOff);
  const satelliteNum = screenStore((state) => state.satellite);
  const { nodes, materials } = useGLTF("/multipurposeSatellite/scene.gltf");
  const [pos, setPos] = useState([0, -5000000, 0]);

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Static",
    args: [0],
  }));

  useFrame(() => {
    api.position.set(...pos);
  });

  console.log("위성 필드");
  return (
    <group>
      {field.map((xitem, xindex) => (
        <group key={"x" + xindex}>
          {field.map((zitem, zindex) => (
            <mesh
              onPointerOver={(e) => {
                e.object.material.color.setStyle("#009200");
                setPos([...Object.values(e.object.position)]);
              }}
              onPointerOut={(e) => {
                e.object.material.color.setStyle("white");
                setPos([0, -5000000, 0]);
              }}
              key={"z" + zindex}
              position={
                satelliteMapCheck === true ? [4950 + xindex * -550, -10, 4950 + zindex * -550] : [0, 0, 0]
              }
              rotation={[Math.PI / 0.66666, 0, 0]}>
              <planeGeometry args={[500, 500]} />
              <meshBasicMaterial color="white" opacity={0.1} transparent />
            </mesh>
          ))}
        </group>
      ))}
      <MultipurposeSatellite />
      <group ref={ref} scale={100} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.defaultMaterial.geometry} material={nodes.defaultMaterial.material} />
            <mesh geometry={nodes.defaultMaterial_1.geometry} material={nodes.defaultMaterial_1.material} />
          </group>
        </group>
      </group>
    </group>
  );
};
