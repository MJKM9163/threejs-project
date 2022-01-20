import { useCompoundBody } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

export const MidStone1 = ({ ...props }) => {
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCompoundBody(() => ({
    type: "Static",
    position: [-90, 0, -65],
    shapes: [
      {
        type: "Cylinder",
        position: [0, 10, 0],
        rotation: [0, 0, 0],
        args: [16, 16, 30, 20],
      },
    ],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[480, -15, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mid_1_MID_0.geometry}
                material={nodes.Mid_1_MID_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const MidStone2 = ({ ...props }) => {
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCompoundBody(() => ({
    type: "Static",
    position: [-90, 0, 70],
    shapes: [
      {
        type: "Cylinder",
        position: [0, 10, 0],
        rotation: [0, 0, 0],
        args: [22, 22, 30, 20],
      },
    ],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[275, -10, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mid_2_MID_0.geometry}
                material={nodes.Mid_2_MID_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const MidStone3 = ({ ...props }) => {
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCompoundBody(() => ({
    type: "Static",
    position: [-100, 0, 107],
    shapes: [
      {
        type: "Cylinder",
        position: [0, 10, 0],
        rotation: [0, 0, 0],
        args: [22, 22, 30, 20],
      },
    ],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[93, -9, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mid_3_MID_0.geometry}
                material={nodes.Mid_3_MID_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const MidStone4 = ({ ...props }) => {
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCompoundBody(() => ({
    type: "Static",
    position: [-100, 0, 35],
    shapes: [
      {
        type: "Cylinder",
        position: [0, 10, 0],
        rotation: [0, 0, 0],
        args: [18, 18, 30, 20],
      },
    ],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0.53]}
            scale={1.12}
          >
            <group position={[-290, -10, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mid_4_MID_0.geometry}
                material={nodes.Mid_4_MID_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const MidStone5 = ({ ...props }) => {
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCompoundBody(() => ({
    type: "Static",
    position: [35, 0, 80],
    shapes: [
      {
        type: "Cylinder",
        position: [0, 10, 0],
        rotation: [0, 0, 0],
        args: [18, 18, 30, 20],
      },
    ],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[-110, -20, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mid_4_MID_0_1.geometry}
                material={nodes.Mid_4_MID_0_1.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const MidStone6 = ({ ...props }) => {
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCompoundBody(() => ({
    type: "Static",
    position: [-40, 0, -33],
    shapes: [
      {
        type: "Cylinder",
        position: [0, 10, 0],
        rotation: [0, 0, 0],
        args: [16, 16, 30, 20],
      },
    ],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, -2.68]}>
            <group position={[-108, -15, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mid_5_MID_0.geometry}
                material={nodes.Mid_5_MID_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/stonePack/scene.gltf");
