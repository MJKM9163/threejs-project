import React, { useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import styled from "styled-components";

const HtmlDiv = styled(Html)`
  background-color: #ff006a86;
`;

const name = ["???", "MagicStone"];

export function MagicStone1({ ...props }) {
  // const pointerOver = () => {
  //   set(false);
  //   console.log(test)
  // }
  // const pointerOut = () => {
  //   set(true);
  //   console.log(test)
  // }
  const [test, set] = useState(true);
  const group = useRef();

  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      // onPointerOver={pointerOver}
      // onPointerOut={pointerOut}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-176.5, -4.32, 313.01]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.7}
          >
            <HtmlDiv
              //position={[0, 0, 0]}
              sprite
              transform
              distanceFactor={20}
              occlude={test}
            >
              {name[1]}
            </HtmlDiv>
            <group position={[209.33, 335.28, 8.98]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Runic_2_Runic_0.geometry}
                material={nodes.Runic_2_Runic_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export function MagicStone2({ ...props }) {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-132.54, -2.06, 314.83]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.7}
          >
            <group position={[146.7, 337.87, 5.77]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Runic_3_Runic_0.geometry}
                material={nodes.Runic_3_Runic_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export function MagicStone3({ ...props }) {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-79.2, -4.98, 315.64]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.7}
          >
            <group position={[70.7, 339.03, 9.93]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Runic_4_Runic_0.geometry}
                material={nodes.Runic_4_Runic_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export function MagicStone4({ ...props }) {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-18.43, -5.91, 316.19]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.7}
          >
            <group position={[-15.87, 339.81, 11.25]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Runic_5_Runic_0.geometry}
                material={nodes.Runic_5_Runic_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export function MagicStone5({ ...props }) {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[45.6, -4.13, 316.29]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.7}
          >
            <group position={[-107.09, 339.95, 8.71]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Runic_6_Runic_0.geometry}
                material={nodes.Runic_6_Runic_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/stonePack/scene.gltf");
