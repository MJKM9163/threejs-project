import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

export const MidStone1 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-522.91, 16.25, -22.34]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[472.1, -22.34, 8.98]}>
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
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-329.28, -0.2, -21.95]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[278.48, -21.95, 25.43]}>
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
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-136.7, -22.18, -8.74]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[85.9, -8.74, 47.41]}>
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
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[233.11, -22.35, -17.34]}
            rotation={[-Math.PI / 2, 0, 0.53]}
            scale={1.12}
          >
            <group position={[-283.91, -17.34, 47.57]}>
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
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[60.48, -10.14, -17.33]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[-111.29, -17.33, 35.36]}>
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
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[421.37, -4.8, 2.38]}
            rotation={[-Math.PI / 2, 0, -2.68]}
          >
            <group position={[-116.06, -11.36, 30.02]}>
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
