import { useSphere } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { DoubleSide, Vector3 } from "three";
import { screenStore } from "../hooks/stores/screenStore";

export const SatelliteField = () => {
  const field = new Array(20).fill(0);
  const satelliteMapCheck = screenStore((state) => state.satelliteMapOnOff);
  const satelliteNum = screenStore((state) => state.satellite);
  const satellitePos = screenStore((state) => state.satellitePos);
  const { nodes, materials } = useGLTF("/multipurposeSatellite/scene.gltf");
  const [pos, setPos] = useState([0, -5000000, 0]);

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Static",
    //args: [100],
  }));

  useFrame(() => {
    api.position.set(...pos);
  });

  console.log("위성 필드");
  return (
    <group>
      {satelliteMapCheck === true ? (
        <group>
          {field.map((xitem, xindex) => (
            <group key={"x" + xindex}>
              {field.map((zitem, zindex) => (
                <mesh
                  onPointerOver={(e) => {
                    e.object.material.color.setStyle("#002fff");
                    setPos([...Object.values(e.object.position)]);
                  }}
                  onPointerOut={(e) => {
                    e.object.material.color.setStyle("#2d3f52");
                    setPos([0, -5000000, 0]);
                  }}
                  onClick={(e) =>
                    satelliteNum > 0
                      ? satellitePos.some((item) => {
                          return item.toString() === [...e.object.position].toString();
                        })
                        ? console.log("이미 설치된 자리입니다.")
                        : (screenStore.setState({ satellite: satelliteNum - 1 }),
                          screenStore.setState({ satellitePos: [...satellitePos, [...e.object.position]] }),
                          console.log(e))
                      : console.log("설치 가능한 위성이 없습니다.")
                  }
                  key={"z" + zindex}
                  position={[4950 + xindex * -550, -10, 4950 + zindex * -550]}
                  rotation={[Math.PI / 0.66666, 0, 0]}>
                  <planeGeometry args={[500, 500]} />
                  <meshBasicMaterial color="#778899" />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      ) : null}
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
