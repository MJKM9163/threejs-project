import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

export const SmallStone1 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-391.06, 2.82, 199.02]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.82}
          >
            <group position={[450.22, 189.47, 10.63]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Small_1_SMall_0.geometry}
                material={nodes.Small_1_SMall_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const SmallStone2 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-301.62, 2.29, 196.59]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.82}
          >
            <group position={[341.81, 186.52, 11.28]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Small_2_SMall_0.geometry}
                material={nodes.Small_2_SMall_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const SmallStone3 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-201.56, 2.72, 192.77]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.82}
          >
            <group position={[220.52, 181.9, 10.75]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Small_3_SMall_0.geometry}
                material={nodes.Small_3_SMall_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const SmallStone4 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-87.86, 2.08, 195.62]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.82}
          >
            <group position={[82.71, 185.35, 11.53]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Small_4_SMall_0.geometry}
                material={nodes.Small_4_SMall_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const SmallStone5 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[27.88, 2.23, 194.59]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.82}
          >
            <group position={[-57.58, 184.11, 11.35]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Small_5_SMall_0.geometry}
                material={nodes.Small_5_SMall_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const SmallStone6 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[122.46, 3.24, 195.73]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.82}
          >
            <group position={[-172.22, 185.49, 10.13]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Small_6_SMall_0.geometry}
                material={nodes.Small_6_SMall_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const SmallStone7 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[203.73, 3.68, 197.83]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.82}
          >
            <group position={[-270.73, 188.02, -1.04]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Small_7_SMall_0.geometry}
                material={nodes.Small_7_SMall_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const SmallStone8 = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[288.07, 12.1, 197.09]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.82}
          >
            <group position={[-372.97, 187.13, -0.61]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Small_8_SMall_0.geometry}
                material={nodes.Small_8_SMall_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/stonePack/scene.gltf");
