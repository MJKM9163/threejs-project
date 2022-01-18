import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

export const BigStone1 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-535.25, 48.15, -315.48]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[535.25, -315.48, -12.69]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.BIG_1_BiG_0.geometry}
                material={nodes.BIG_1_BiG_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const BigStone2 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-243.07, 16.15, -311.82]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[243.07, -311.82, 19.31]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Big_2_BiG_0.geometry}
                material={nodes.Big_2_BiG_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const BigStone3 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[15.3, 45.34, -290.2]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[-15.3, -290.2, -9.88]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Big_3_BiG_0.geometry}
                material={nodes.Big_3_BiG_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const BigStone4 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[221.83, 26.41, -247.65]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[-221.83, -247.65, 9.05]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Big_4_BiG_0.geometry}
                material={nodes.Big_4_BiG_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const BigStone5 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[432.9, -4.48, -239.97]}
            rotation={[-Math.PI / 2 - 0.1, -0.3, 0.1]}
          >
            <group position={[-471.56, -239.97, 39.95]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Big_5_BiG_0.geometry}
                material={nodes.Big_5_BiG_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/stonePack/scene.gltf");
