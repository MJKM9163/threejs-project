import React, { useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import styled from "styled-components";
import { useCylinder } from "@react-three/cannon";

const HtmlDiv = styled(Html)`
  background-color: #ff006a86;
`;

const name = ["???", "MagicStone"];

export function MagicStone1({ ...props }) {
  const pointerOver = () => {
    set(false);
    console.log(test);
  };
  const pointerOut = () => {
    set(true);
    console.log(test);
  };
  const [test, set] = useState(true);

  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCylinder(() => ({
    type: "Static",
    position: [-21, 0, 17],
    rotation: [0, 0, 0],
    args: [2, 2, 5],
  }));

  return (
    <group
      ref={ref}
      {...props}
      dispose={null}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.7}
          >
            <HtmlDiv sprite transform distanceFactor={20} occlude={test}>
              {name[1]}
            </HtmlDiv>
            <group position={[210, 340, 0]}>
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
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCylinder(() => ({
    type: "Static",
    position: [-115, 0, 53],
    rotation: [0, 0, 0],
    args: [1, 2, 5],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.7}
          >
            <group position={[150, 340, 0]}>
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
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCylinder(() => ({
    type: "Static",
    position: [140, 0, -38],
    rotation: [0, 0.7, 0],
    args: [1, 2, 5],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.7}
          >
            <group position={[70, 340, 0]}>
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
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCylinder(() => ({
    type: "Static",
    position: [-53, 1.5, -122],
    rotation: [0, 0, 0],
    args: [2, 2, 5],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.7}
          >
            <group position={[-20, 330, -20]}>
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
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCylinder(() => ({
    type: "Static",
    position: [115, 57, -62],
    rotation: [0, 0, 0],
    args: [2, 2, 8],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.7}
          >
            <group position={[-108, 340, -30]}>
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
