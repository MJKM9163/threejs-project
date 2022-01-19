import React, { useEffect, useRef } from "react";
import { useBox, useSphere } from "@react-three/cannon";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useKeyboardControls } from "../hooks/useKeyboardControls";

const SPEED = 12;
const Character = ({ ...props }) => {
  //const Model = useRef();

  const { camera } = useThree();

  const [Model, ModelApi] = useBox(() => ({
    mass: 1,
    type: "Kinematic",
    rotation: [Math.PI / 2, 0, 0],
    ...props,
  }));
  const [ModelMovingBox, ModelMovingBoxApi] = useBox(() => ({
    mass: 1,
    type: "Kinematic",
    ...props,
  }));
  const [ModelBox, ModelBoxapi] = useBox(() => ({
    mass: 1,
    type: "Kinematic",
    args: [2, 2, 8.5],
    position: [0, 4.3, 0],
    rotation: [Math.PI / 2, 0, 0],
    ...props,
  }));
  const [sphere, api] = useSphere(() => ({
    mass: 1,
    type: "Kinematic",
    args: [0.5],
    position: [0, 8.5, 0],
    ...props,
  }));

  const { nodes, materials, animations } = useGLTF("Ybot/Idle.gltf");
  const { actions } = useAnimations(animations, Model);
  useEffect(() => actions.Idle.play(), []);

  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboardControls();

  // console.log(camera.rotation);

  const velocity = useRef([0, 0, 0]);
  console.log(ModelApi.rotation);
  // console.log(api);
  // console.log(velocity.current);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
    ModelBoxapi.velocity.subscribe((v) => (velocity.current = v));
    ModelMovingBoxApi.velocity.subscribe((v) => (velocity.current = v));
  }, [api, ModelBoxapi, ModelMovingBoxApi, velocity]);
  let num = 0;
  useFrame(() => {
    //num += 0.03;

    //sphere.current.getWorldPosition(camera.position);
    //ModelApi.rotation.set(Math.PI / 2, 0, num);

    ModelApi.rotation.set(Math.PI / 2, 0, camera.rotation._y * 1);

    //console.log(Model.current?.rotation);
    //console.log(camera.rotation);
    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      moveForward ? -1 : 0 - moveBackward ? 1 : 0
    );
    //console.log(frontVector);
    const sideVector = new Vector3(moveLeft ? 1 : 0 - moveRight ? -1 : 0, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    ModelBoxapi.velocity.set(direction.x, velocity.current[1], direction.z);
    ModelMovingBoxApi.velocity.set(
      direction.x,
      velocity.current[1],
      direction.z
    );
  });

  return (
    <>
      {/* <group name="Main" {...props} dispose={null} scale={0.05}>
        <meshNormalMaterial color={"red"} />
      </group> */}
      <group name="Camera" ref={sphere} {...props} dispose={null}>
        <mesh>
          <sphereGeometry attach="geometry" args={[0.5]} />
          <meshStandardMaterial attach="material" color="red" />
        </mesh>
      </group>
      <group name={"Model_Moving_Box"} ref={ModelMovingBox}>
        <group
          name="Model_Box"
          ref={ModelBox}
          dispose={null}
          scale={0.05}
        ></group>
        <group
          name="Model"
          ref={Model}
          dispose={null}
          //rotation={[Math.PI / 2, 0, 0]}
          scale={0.05}
        >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            geometry={nodes.Alpha_Joints.geometry}
            material={materials["Alpha_Joints_MAT.004"]}
            skeleton={nodes.Alpha_Joints.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Alpha_Surface.geometry}
            material={materials["Alpha_Body_MAT.004"]}
            skeleton={nodes.Alpha_Surface.skeleton}
          />
        </group>
      </group>
    </>
  );
};

export default Character;
useGLTF.preload("Ybot/Idle.gltf");
