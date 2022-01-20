import { useCompoundBody } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
//Cylinder
export const SmallStone1 = ({ ...props }) => {
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCompoundBody(() => ({
    type: "Static",
    position: [-20, -7, 7],
    shapes: [
      {
        type: "Box",
        position: [0, 10, 0],
        rotation: [0, 0, 0],
        args: [17, 10, 12],
      },
      {
        type: "Cylinder",
        position: [-5, 10, 5],
        rotation: [0, 0, 0],
        args: [5, 5, 10],
      },
    ],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.82}
          >
            <group position={[450, 183, 20]}>
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
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCompoundBody(() => ({
    type: "Static",
    position: [0, 0, -100],
    shapes: [
      {
        type: "Cylinder",
        position: [-5, 7, 5],
        rotation: [0, 0, 0],
        args: [13, 13, 15],
      },
    ],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.82}
          >
            <group position={[330, 172, 0]}>
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
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCompoundBody(() => ({
    type: "Static",
    position: [105, -2, 70],
    shapes: [
      {
        type: "Cylinder",
        position: [-5, 10, 5],
        rotation: [0, 0, 0],
        args: [13, 13, 20],
      },
    ],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, props.rotationZ ? props.rotationZ : 0]}
            scale={0.82}
          >
            <group position={[245, 190, 10]}>
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

useGLTF.preload("/stonePack/scene.gltf");
