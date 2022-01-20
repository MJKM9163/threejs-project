import { useBox, useCompoundBody } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

export const BigStone1 = ({ ...props }) => {
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  const [ref] = useCompoundBody(() => ({
    mass: 100,
    type: "Static",
    position: [118, 18, -58],
    shapes: [
      {
        type: "Box",
        position: [0, 36, 8],
        rotation: [0.2, 0.5, 0.1],
        args: [13, 8, 17],
      },
      {
        type: "Box",
        position: [-4, 27, 6],
        rotation: [0, 0.5, 0.1],
        args: [18, 15, 27],
      },
      {
        type: "Cylinder",
        position: [-8, 0, 5],
        rotation: [0, 0, 0],
        args: [13, 20, 46, 10],
      },
      {
        type: "Cylinder",
        position: [-5, 0, -8.5],
        rotation: [0, 0, 0],
        args: [9.5, 11, 46, 10],
      },
      {
        type: "Cylinder",
        position: [-15, -15, -13],
        rotation: [0, 0, 0],
        args: [4, 6, 10, 10],
      },
      {
        type: "Cylinder",
        position: [4, -3, 10],
        rotation: [0, 0, 0],
        args: [15, 15, 30, 10],
      },
      {
        type: "Cylinder",
        position: [10, -14, 27],
        rotation: [0, 0, 0],
        args: [4, 6, 13, 10],
      },
      {
        type: "Cylinder",
        position: [-3, -9, 24],
        rotation: [0, 0, 0],
        args: [8, 10, 21, 10],
      },
      {
        type: "Cylinder",
        position: [20, -9, 5.5],
        rotation: [0, 0, 0],
        args: [7, 10, 21, 10],
      },
      {
        type: "Cylinder",
        position: [4, -14, -19],
        rotation: [0, 0, 0],
        args: [4, 6, 13, 10],
      },
      // {
      //   type: "Sphere",
      //   position: [0, 50, 0],
      //   rotation: [0, 0, 0],
      //   args: [50],
      // },
    ],
  }));

  return (
    <>
      <group ref={ref} {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
            <group position={[540, -40, 330]} rotation={[-Math.PI / 2, 0, 0]}>
              <group position={[0, 0, 0]}>
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
    </>
  );
};

export const BigStone2 = ({ ...props }) => {
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  const [ref] = useCompoundBody(() => ({
    mass: 1,
    type: "Static",
    position: [120, 18, -68],
    shapes: [
      {
        type: "Cylinder",
        position: [-45, -4, 17.5],
        rotation: [0, 0, 0],
        args: [12, 18, 28, 20],
      },
      {
        type: "Cylinder",
        position: [-46, -2, 20],
        rotation: [0, 0, 0],
        args: [7, 8, 32, 20],
      },
      {
        type: "Cylinder",
        position: [-52, -2, 20],
        rotation: [0, 0, 0],
        args: [6, 8, 32, 20],
      },
      {
        type: "Cylinder",
        position: [-55, -7, 18],
        rotation: [0, 0, 0],
        args: [11, 13, 20, 20],
      },
      {
        type: "Cylinder",
        position: [-50, -12, 5],
        rotation: [0, -0.3, -Math.PI / 2],
        args: [9.5, 11, 20, 20],
      },
      {
        type: "Cylinder",
        position: [-65, -10, 2],
        rotation: [0, 0, 0],
        args: [6, 8, 15, 20],
      },
      {
        type: "Box",
        position: [-70, -13, 15],
        rotation: [0, 0, 0.3],
        args: [18, 12, 18],
      },
      {
        type: "Box",
        position: [-83, -13, 15],
        rotation: [0, 0, 0],
        args: [5, 10, 7],
      },
      {
        type: "Box",
        position: [-75, -17, 25],
        rotation: [0, -0.3, 0],
        args: [15, 4, 9],
      },
    ],
  }));
  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group position={[30, -50, 370]} rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[0, 0, 0]}>
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
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCompoundBody(() => ({
    type: "Static",
    position: [-25, 10, -115],
    args: [10, 10, 10],
    shapes: [
      {
        type: "Cylinder",
        position: [-45, 10, 15.5],
        rotation: [0, 0, 0],
        args: [25, 25, 50, 20],
      },
      {
        type: "Cylinder",
        position: [-58, 10, -8],
        rotation: [0, 0, 0],
        args: [22, 24, 50, 20],
      },
      {
        type: "Cylinder",
        position: [-71, 0, 13],
        rotation: [0, 0, 0],
        args: [12, 12, 20, 20],
      },
      {
        type: "Cylinder",
        position: [-65, 0, 28],
        rotation: [0, 0, 0],
        args: [5, 5, 20, 20],
      },
    ],
  }));
  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group position={[-150, 0, 300]} rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[0, 0, 0]}>
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
  const { nodes } = useGLTF("/stonePack/scene.gltf");

  const [ref] = useCompoundBody(() => ({
    type: "Static",
    position: [-90, 10, 20],
    args: [10, 10, 10],
    shapes: [
      {
        type: "Cylinder",
        position: [-45, 10, 15.5],
        rotation: [0, 0, 0],
        args: [19, 19, 50, 20],
      },
    ],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[-360, -300, 0]}>
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
  const { nodes } = useGLTF("/stonePack/scene.gltf");
  const [ref] = useCompoundBody(() => ({
    mass: 1,
    type: "Static",
    position: [120, 18, -125],
    shapes: [
      {
        type: "Box",
        position: [-43, 3, 17.5],
        rotation: [0.02, -1, 0.56],
        args: [110, 5, 30],
      },
      {
        type: "Cylinder",
        position: [-40, -15, 20],
        rotation: [-0.8, -1.1, Math.PI / 2],
        args: [16, 16, 50],
      },
    ],
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <group
            position={[-530, -110, 375]}
            rotation={[-Math.PI / 2 - 0.1, -0.3, 0.1]}
          >
            <group position={[0, 0, 0]}>
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
