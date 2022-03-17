import React, { useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import styled from "styled-components";
import { screenStore } from "../../hooks/stores/screenStore";

const SelectSatellite = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  top: ${(props) => (props.check ? "-80px" : "100000px")};
  left: -114px;
  width: 225px;
  height: 63.25px;
  cursor: default;

  .sbox {
    position: relative;
    width: 112.5px;
    height: 63.25px;
    transition: 0.2s;

    :hover {
      background-color: #ffffff3d;
    }
    :active {
      background-color: #ffffff8d;
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -2;
    }
    .text {
      position: absolute;
      width: 100%;
      bottom: 0px;
      text-align: center;
      color: white;
      background-color: #8080807d;
    }
  }
`;

let satelliteOption = {
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

export function MultipurposeSatellite({ position, num }) {
  const { nodes, materials } = useGLTF("/multipurposeSatellite/scene.gltf");
  const satellitePos = screenStore((state) => state.satellitePos);
  const defenseSatellitePos = screenStore((state) => state.defenseSatellitePos);
  const dustExtractorPos = screenStore((state) => state.dustExtractorPos);

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position,
    //args: [100],
  }));

  const [on, setOn] = useState(false);
  console.log("");
  useFrame(() => {
    api.rotation.set(0, (satelliteOption[num].R += 0.01), 0);
  });

  return (
    <group
      ref={ref}
      scale={100}
      position={position}
      dispose={null}
      onClick={(e) => {
        setOn(!on);
      }}>
      <Html>
        <SelectSatellite check={on}>
          <div
            className="sbox"
            onClick={(e) => {
              setOn(false);
              screenStore.setState({ defenseSatellitePos: [...defenseSatellitePos, position] });
              screenStore.setState({
                satellitePos: satellitePos.filter((pos) => pos.toString() !== position.toString()),
              });
            }}>
            <img
              className="simage"
              width={112.5}
              height={63.25}
              src="/images/production/defenseSatellite.png"
              alt="방어 위성"></img>
            <div className="text">행성 방어 위성</div>
          </div>
          <div
            className="sbox"
            onClick={(e) => {
              setOn(false);
              screenStore.setState({ dustExtractorPos: [...dustExtractorPos, position] });
              screenStore.setState({
                satellitePos: satellitePos.filter((pos) => pos.toString() !== position.toString()),
              });
            }}>
            <img
              className="simage"
              width={112.5}
              height={63.25}
              src="/images/production/dustExtractor.png"
              alt="채칩 위성"></img>
            <div className="text">먼지 추출기</div>
          </div>
        </SelectSatellite>
      </Html>

      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={nodes.defaultMaterial.material} />
          <mesh geometry={nodes.defaultMaterial_1.geometry} material={nodes.defaultMaterial_1.material} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/multipurposeSatellite/scene.gltf");
